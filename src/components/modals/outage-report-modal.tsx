"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Send } from "lucide-react"
import { useTransition } from "react"
import { createOutageReport } from "@/lib/actions/outage-report"

const outageReportSchema = z.object({
  type: z.string().min(1, "Outage type is required"),
  cause: z.string().min(1, "Cause is required"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  details: z.string().optional(),
})

type OutageReportValues = z.infer<typeof outageReportSchema>

type OutageReportModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OutageReportModal({ open, onOpenChange }: OutageReportModalProps) {
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<OutageReportValues>({
    resolver: zodResolver(outageReportSchema),
    defaultValues: {
      type: "",
      cause: "",
      address: "",
      city: "",
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
      details: "",
    },
  })

  function onSubmit(data: OutageReportValues) {
    startTransition(async () => {
      await createOutageReport({
        type: data.type as "INTERNET" | "POWER",
        cause: data.cause,
        address: data.address,
        city: data.city,
        startTime: data.startTime,
        endTime: data.endTime || undefined,
        startDate: data.startDate,
        endDate: data.endDate || undefined,
        details: data.details || undefined,
      })
      reset()
      onOpenChange(false)
    })
  }

  function handleClose(isOpen: boolean) {
    if (!isOpen) reset()
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Report Outage</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type of Outage</Label>
              <Select onValueChange={(val) => setValue("type", val as string, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INTERNET">Internet</SelectItem>
                  <SelectItem value="POWER">Power</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-xs text-destructive">{errors.type.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cause">Outage Cause</Label>
              <Input id="cause" placeholder="e.g., Scheduled maintenance" {...register("cause")} />
              {errors.cause && (
                <p className="text-xs text-destructive">{errors.cause.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" placeholder="123 Main St" {...register("address")} />
              {errors.address && (
                <p className="text-xs text-destructive">{errors.address.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Manila" {...register("city")} />
              {errors.city && (
                <p className="text-xs text-destructive">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" type="time" {...register("startTime")} />
              {errors.startTime && (
                <p className="text-xs text-destructive">{errors.startTime.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" type="time" {...register("endTime")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" {...register("startDate")} />
              {errors.startDate && (
                <p className="text-xs text-destructive">{errors.startDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" {...register("endDate")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <Textarea
              id="details"
              placeholder="Provide additional details about the outage..."
              rows={3}
              {...register("details")}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleClose(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"} <Send />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
