"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MoodPicker } from "@/components/dashboard/mood-picker"
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
    register,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <MoodPicker
          value={selectedMood || null}
          onChange={(mood) => setValue("mood", mood, { shouldValidate: true })}
        />
        {errors.mood && (
          <p className="text-xs text-destructive mt-2">{errors.mood.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="accomplishments" className="text-xs font-medium text-foreground/70">
          What are your accomplishments today? <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="accomplishments"
          placeholder="List your accomplishments for the day..."
          rows={3}
          className="resize-none bg-background border-border/60 text-sm placeholder:text-muted-foreground/50"
          {...register("accomplishments")}
        />
        {errors.accomplishments && (
          <p className="text-xs text-destructive">{errors.accomplishments.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="challenges" className="text-xs font-medium text-foreground/70">
          What were your challenges? What are your next steps?{" "}
          <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="challenges"
          placeholder="Describe your challenges and planned next steps..."
          rows={3}
          className="resize-none bg-background border-border/60 text-sm placeholder:text-muted-foreground/50"
          {...register("challenges")}
        />
        {errors.challenges && (
          <p className="text-xs text-destructive">{errors.challenges.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Label htmlFor="managementSupport" className="text-xs font-medium text-foreground/70">
            How can the company best support you?
          </Label>
          <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            Management only
          </span>
        </div>
        <Textarea
          id="managementSupport"
          placeholder="Optional — share any support you need..."
          rows={2}
          className="resize-none bg-background border-border/60 text-sm placeholder:text-muted-foreground/50"
          {...register("managementSupport")}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:opacity-90 shadow-sm shadow-primary/20"
      >
        Submit Report <Send className="h-3.5 w-3.5" />
      </Button>
    </form>
  )
}
