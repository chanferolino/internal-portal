"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MoodPicker } from "@/components/dashboard/mood-picker"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { Send } from "lucide-react"

const shiftReportSchema = z.object({
  mood: z.string().min(1, "Please select your mood"),
  accomplishments: z.string().min(1, "Please list your accomplishments"),
  challenges: z.string().min(1, "Please describe your challenges and next steps"),
  managementSupport: z.string().optional(),
})

type ShiftReportValues = z.infer<typeof shiftReportSchema>

export function ShiftReportForm() {
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ShiftReportValues>({
    resolver: zodResolver(shiftReportSchema),
    defaultValues: {
      mood: "",
      accomplishments: "",
      challenges: "",
      managementSupport: "",
    },
  })

  const selectedMood = watch("mood")

  function onSubmit(data: ShiftReportValues) {
    console.log("Shift report submitted:", data)
    // TODO: API call to create ShiftReport
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
      <div>
        <MoodPicker
          value={selectedMood || null}
          onChange={(mood) => setValue("mood", mood, { shouldValidate: true })}
        />
        {errors.mood && (
          <p className="text-sm text-destructive mt-2">{errors.mood.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-foreground/70">
          What are your accomplishments today? <span className="text-destructive">*</span>
        </Label>
        <RichTextEditor
          placeholder="List your accomplishments for the day..."
          onChange={(html) => setValue("accomplishments", html, { shouldValidate: true })}
        />
        {errors.accomplishments && (
          <p className="text-sm text-destructive">{errors.accomplishments.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-foreground/70">
          What were your challenges? What are your next steps?{" "}
          <span className="text-destructive">*</span>
        </Label>
        <RichTextEditor
          placeholder="Describe your challenges and planned next steps..."
          onChange={(html) => setValue("challenges", html, { shouldValidate: true })}
        />
        {errors.challenges && (
          <p className="text-sm text-destructive">{errors.challenges.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium text-foreground/70">
            How can the company best support you?
          </Label>
          <span className="text-sm text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            Management only
          </span>
        </div>
        <RichTextEditor
          placeholder="Optional — share any support you need..."
          onChange={(html) => setValue("managementSupport", html)}
        />
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          className="w-1/3 bg-primary text-primary-foreground hover:opacity-90 shadow-sm shadow-primary/20"
        >
          Submit Report <Send className="h-3.5 w-3.5" />
        </Button>
      </div>
    </form>
  )
}
