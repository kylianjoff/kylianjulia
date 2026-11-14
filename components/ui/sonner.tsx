"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "hsl(var(--background))",
          "--normal-text": "hsl(var(--foreground))",
          "--normal-border": "hsl(var(--border))",
          "--success-bg": "hsl(142 76% 36% / 0.12)",
          "--success-text": "hsl(142 76% 36%)",
          "--success-border": "hsl(142 76% 36% / 0.35)",
          "--error-bg": "hsl(0 84% 60% / 0.12)",
          "--error-text": "hsl(0 84% 60%)",
          "--error-border": "hsl(0 84% 60% / 0.35)",
          "--warning-bg": "hsl(38 92% 50% / 0.14)",
          "--warning-text": "hsl(38 92% 50%)",
          "--warning-border": "hsl(38 92% 50% / 0.35)",
          "--info-bg": "hsl(221 83% 53% / 0.12)",
          "--info-text": "hsl(221 83% 53%)",
          "--info-border": "hsl(221 83% 53% / 0.35)",
          "--border-radius": "calc(var(--radius) + 2px)",
          "--shadow": "0 12px 30px -12px rgba(15, 23, 42, 0.35)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:backdrop-blur-sm",
          title: "text-sm font-medium",
          description: "text-sm opacity-80",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
          closeButton: "bg-background text-foreground border border-border",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
