import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type InlineToken =
  | { type: 'text';   value: string }
  | { type: 'bold';   content: string }
  | { type: 'italic'; content: string }
  | { type: 'code';   content: string }
  | { type: 'link';   text: string; href: string }
  | { type: 'image';  alt: string; src: string };

type Block =
  | { type: 'heading';    level: 1 | 2 | 3 | 4; text: string }
  | { type: 'paragraph';  lines: string[] }
  | { type: 'code';       lang: string; code: string }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'ul';         items: string[] }
  | { type: 'ol';         items: string[] }
  | { type: 'hr' }
  | { type: 'image';      alt: string; src: string };

function normalizeImageSrc(src: string): string {
        const normalized = src.trim().replace(/^\/?assets\/blogs\//, '/posts/');
        return normalized.startsWith('/') || normalized.startsWith('http')
                ? normalized
                : `/${normalized}`;
}

// ─── Inline tokenizer ─────────────────────────────────────────────────────────

const INLINE_PATTERNS: Array<{
    re: RegExp;
    make: (m: RegExpMatchArray) => InlineToken;
}> = [
    { re: /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/, make: m => ({ type: 'image', alt: m[1], src: normalizeImageSrc(m[2]) }) },
    { re: /\[([^\]]+)\]\(([^)]+)\)/,   make: m => ({ type: 'link',   text: m[1], href: m[2] }) },
    { re: /\*\*([^*\n]+)\*\*/,         make: m => ({ type: 'bold',   content: m[1] }) },
    { re: /\*([^*\n]+)\*/,             make: m => ({ type: 'italic', content: m[1] }) },
    { re: /`([^`\n]+)`/,               make: m => ({ type: 'code',   content: m[1] }) },
];

function tokenizeInline(text: string): InlineToken[] {
    const tokens: InlineToken[] = [];
    let rem = text;

    while (rem.length > 0) {
        let earliest: {
            idx: number;
            m: RegExpMatchArray;
            make: (m: RegExpMatchArray) => InlineToken;
        } | null = null;

        for (const { re, make } of INLINE_PATTERNS) {
            const m = rem.match(re);
            if (m?.index !== undefined) {
                if (earliest === null || m.index < earliest.idx) {
                    earliest = { idx: m.index, m, make };
                }
            }
        }

        if (!earliest) {
            tokens.push({ type: 'text', value: rem });
            break;
        }

        if (earliest.idx > 0) {
            tokens.push({ type: 'text', value: rem.slice(0, earliest.idx) });
        }

        tokens.push(earliest.make(earliest.m));
        rem = rem.slice(earliest.idx + earliest.m[0].length);
    }

    return tokens;
}

function renderInline(text: string, keyPrefix = ''): React.ReactNode {
    const tokens = tokenizeInline(text);

    if (tokens.length === 0) return null;
    if (tokens.length === 1 && tokens[0].type === 'text') return tokens[0].value;

    return (
        <>
            {tokens.map((tok, i) => {
                const k = `${keyPrefix}-${i}`;
                switch (tok.type) {
                    case 'text':
                        return <React.Fragment key={k}>{tok.value}</React.Fragment>;
                    case 'bold':
                        return (
                            <strong key={k} className="font-semibold text-white">
                                {renderInline(tok.content, k)}
                            </strong>
                        );
                    case 'italic':
                        return (
                            <em key={k} className="italic text-slate-300">
                                {renderInline(tok.content, k)}
                            </em>
                        );
                    case 'code':
                        return (
                            <code
                                key={k}
                                className="px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-500/25 font-mono text-[0.85em] text-blue-300"
                            >
                                {tok.content}
                            </code>
                        );
                    case 'link': {
                        const isExternal = tok.href.startsWith('http');
                        return (
                            <a
                                key={k}
                                href={tok.href}
                                className="text-blue-400 hover:text-cyan-300 underline underline-offset-2 decoration-blue-500/40 hover:decoration-cyan-400/60 transition-colors"
                                {...(isExternal
                                    ? { target: '_blank', rel: 'noopener noreferrer' }
                                    : {})}
                            >
                                {renderInline(tok.text, k)}
                            </a>
                        );
                    }
                    case 'image':
                        return (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                key={k}
                                src={tok.src}
                                alt={tok.alt}
                                className="rounded-lg max-w-full my-2 inline-block"
                            />
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
}

// ─── Block parser ─────────────────────────────────────────────────────────────

function parseBlocks(markdown: string): Block[] {
    const lines = markdown.split('\n');
    const blocks: Block[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        // Ligne vide
        if (trimmed === '') { i++; continue; }

        // Bloc de code
        if (trimmed.startsWith('```')) {
            const lang = trimmed.slice(3).trim();
            const codeLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            i++; // fermer ```
            blocks.push({ type: 'code', lang, code: codeLines.join('\n') });
            continue;
        }

        // Séparateur horizontal
        if (/^[-*_]{3,}$/.test(trimmed)) {
            blocks.push({ type: 'hr' });
            i++;
            continue;
        }

        // Titre
        const hMatch = line.match(/^(#{1,4})\s+(.+)$/);
        if (hMatch) {
            blocks.push({
                type: 'heading',
                level: Math.min(hMatch[1].length, 4) as 1 | 2 | 3 | 4,
                text: hMatch[2],
            });
            i++;
            continue;
        }

        // Blockquote
        if (line.startsWith('> ') || line === '>') {
            const qLines: string[] = [];
            while (i < lines.length && (lines[i].startsWith('> ') || lines[i] === '>')) {
                qLines.push(lines[i].replace(/^> ?/, ''));
                i++;
            }
            blocks.push({ type: 'blockquote', lines: qLines });
            continue;
        }

        // Liste non ordonnée
        if (/^[-*+]\s+/.test(line)) {
            const items: string[] = [];
            while (i < lines.length && /^[-*+]\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^[-*+]\s+/, ''));
                i++;
            }
            blocks.push({ type: 'ul', items });
            continue;
        }

        // Liste ordonnée
        if (/^\d+\.\s+/.test(line)) {
            const items: string[] = [];
            while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\d+\.\s+/, ''));
                i++;
            }
            blocks.push({ type: 'ol', items });
            continue;
        }

        // Image seule sur sa ligne
        const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)$/);
        if (imgMatch) {
            blocks.push({ type: 'image', alt: imgMatch[1], src: normalizeImageSrc(imgMatch[2]) });
            i++;
            continue;
        }

        // Paragraphe — accumule les lignes consécutives non-spéciales
        const paraLines: string[] = [];
        while (
            i < lines.length &&
            lines[i].trim() !== '' &&
            !lines[i].match(/^#{1,4}\s/) &&
            !lines[i].trim().startsWith('```') &&
            !lines[i].startsWith('> ') &&
            !/^[-*+]\s+/.test(lines[i]) &&
            !/^\d+\.\s+/.test(lines[i]) &&
            !/^[-*_]{3,}$/.test(lines[i].trim())
        ) {
            paraLines.push(lines[i]);
            i++;
        }
        if (paraLines.length > 0) {
            blocks.push({ type: 'paragraph', lines: paraLines });
        }
    }

    return blocks;
}

// ─── Block renderer ───────────────────────────────────────────────────────────

function renderBlock(block: Block, idx: number): React.ReactNode {
    switch (block.type) {

        case 'heading': {
            const common = 'font-bold leading-tight scroll-mt-20';
            const styles: Record<number, string> = {
                1: `${common} text-3xl mt-10 mb-4 text-white`,
                2: `${common} text-2xl mt-8 mb-3 text-blue-400 border-b border-blue-500/20 pb-2`,
                3: `${common} text-xl mt-6 mb-2 text-white`,
                4: `${common} text-base mt-5 mb-2 text-slate-300 uppercase tracking-wider`,
            };
            const Tag = `h${block.level}` as 'h1' | 'h2' | 'h3' | 'h4';
            return (
                <Tag key={idx} className={styles[block.level]}>
                    {renderInline(block.text, `h${idx}`)}
                </Tag>
            );
        }

        case 'paragraph': {
            const text = block.lines.join(' ');
            return (
                <p key={idx} className="text-slate-300 leading-8 mb-5">
                    {renderInline(text, `p${idx}`)}
                </p>
            );
        }

        case 'code': {
            return (
                <div
                    key={idx}
                    className="relative mb-6 rounded-xl overflow-hidden border border-slate-700/50 bg-[#0d1117]"
                >
                    {/* Barre de titre style éditeur */}
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 border-b border-slate-700/50">
                        <div className="flex gap-1.5">
                            {(['#ef4444', '#f59e0b', '#22c55e'] as const).map((c, j) => (
                                <div
                                    key={j}
                                    style={{ background: c }}
                                    className="w-2.5 h-2.5 rounded-full opacity-70"
                                />
                            ))}
                        </div>
                        {block.lang && (
                            <span className="ml-2 font-mono text-[11px] text-slate-400">
                                {block.lang}
                            </span>
                        )}
                    </div>
                    <pre className="overflow-x-auto p-5 text-sm leading-6 text-slate-200 font-mono">
                        <code>{block.code}</code>
                    </pre>
                </div>
            );
        }

        case 'blockquote': {
            return (
                <blockquote
                    key={idx}
                    className="mb-5 pl-5 border-l-4 border-blue-500/50 bg-blue-950/20 py-3 pr-4 rounded-r-xl"
                >
                    {block.lines.map((l, j) => (
                        <p
                            key={j}
                            className="text-slate-400 italic leading-7 mb-1 last:mb-0"
                        >
                            {renderInline(l, `bq${idx}-${j}`)}
                        </p>
                    ))}
                </blockquote>
            );
        }

        case 'ul': {
            return (
                <ul key={idx} className="mb-5 space-y-2 pl-1">
                    {block.items.map((item, j) => (
                        <li
                            key={j}
                            className="flex items-start gap-3 text-slate-300 leading-7"
                        >
                            <span className="mt-[11px] shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400/70" />
                            <span>{renderInline(item, `ul${idx}-${j}`)}</span>
                        </li>
                    ))}
                </ul>
            );
        }

        case 'ol': {
            return (
                <ol key={idx} className="mb-5 space-y-2 pl-1 list-none">
                    {block.items.map((item, j) => (
                        <li
                            key={j}
                            className="flex items-start gap-3 text-slate-300 leading-7"
                        >
                            <span className="shrink-0 w-6 h-6 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-mono flex items-center justify-center mt-0.5">
                                {j + 1}
                            </span>
                            <span>{renderInline(item, `ol${idx}-${j}`)}</span>
                        </li>
                    ))}
                </ol>
            );
        }

        case 'hr': {
            return (
                <div key={idx} className="my-8 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                    <span className="text-blue-500/40 text-xs">◆</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                </div>
            );
        }

        case 'image': {
            return (
                <figure key={idx} className="my-6 flex flex-col items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={block.src}
                        alt={block.alt}
                        className="rounded-xl max-w-full border border-slate-700/40 shadow-lg shadow-black/40"
                    />
                    {block.alt && (
                        <figcaption className="text-slate-500 text-xs italic">
                            {block.alt}
                        </figcaption>
                    )}
                </figure>
            );
        }

        default:
            return null;
    }
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function renderMarkdown(content: string): React.ReactNode {
    // Normalise les fins de ligne Windows (\r\n) et Mac (\r) → Unix (\n)
    const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const blocks = parseBlocks(normalized);
    return <>{blocks.map((b, i) => renderBlock(b, i))}</>;
}
