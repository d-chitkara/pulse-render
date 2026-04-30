import { useId } from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface Props {
  label: React.ReactNode
  error?: string
  className?: string
  children: React.ReactNode
  /** Override the label's htmlFor — needed when the direct child is a wrapper div, not the input */
  inputId?: string
}

/**
 * Accessible form field wrapper — auto-generates an id and passes it
 * to the Label (htmlFor) and injects it into the child input via cloneElement.
 */
export function FormField({ label, error, className, children, inputId }: Props) {
  const id = useId()
  const child = children as React.ReactElement<any>
  const resolvedId = inputId ?? child?.props?.id ?? id
  const inputEl = child?.props !== undefined
    ? { ...child, props: { ...child.props, id: child.props.id ?? id } }
    : child

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={resolvedId}>{label}</Label>
      {inputEl}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
