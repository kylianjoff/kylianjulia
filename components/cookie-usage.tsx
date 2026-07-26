import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CookieUsageModalProps {
    onOk: () => void;
}

export default function CookieUsageModal({
    onOk,
}: CookieUsageModalProps) {
    return (
        <Card>
            <CardContent className="border border-border bg-background/80 rounded-lg p-4 fixed left-[40px] bottom-[40px] flex flex-col sm:max-w-[80vw] gap-2">
                <CardHeader>
                    <CardTitle>
                        Cookies
                    </CardTitle>
                </CardHeader>
                <p className="text-white">Ce site utilise des cookies !</p>
                <a href="/data-and-cookies" target="_blank" className="hover:text-primary transition-colors">
                    En savoir plus →
                </a>
                <Button variant="secondary" onClick={onOk}>OK</Button>
            </CardContent>
            
        </Card>
    )
}