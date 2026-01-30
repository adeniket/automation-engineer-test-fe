import { z } from "zod";

export const shiftSchema = z.object({
  id: z.string(),
  title: z.string(),
  role: z.string(),
  typeOfShift: z.array(z.string()),
  startTime: z.string(),
  finishTime: z.string(),
  numOfShiftsPerDay: z.number(),
  date: z.string(),
  status: z.enum(["Scheduled", "In Progress", "Completed", "Cancelled"]),
  clockInTime: z.string().nullable(),
  clockOutTime: z.string().nullable(),
  user: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.email(),
      role: z.enum(["admin", "worker"]),
    })
    .nullable(),
  location: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
      postCode: z.string().optional().nullable(),
      address: z.string().optional().nullable(),
      coordinates: z
        .object({
          longitude: z.number().optional(),
          latitude: z.number().optional(),
        })
        .optional()
        .nullable(),
    })
    .nullable(),
});

export const batchShiftsResponseSchema = z.object({
  created: z.array(shiftSchema),
  errors: z.array(
    z.object({
      index: z.number(),
      shift: z.object({
        title: z.string(),
        role: z.string(),
        typeOfShift: z.array(z.string()),
        startTime: z.string(),
        finishTime: z.string(),
        numOfShiftsPerDay: z.number(),
        date: z.string(),
        user: z.string(),
        location: z.object({
          name: z.string().optional(),
          address: z.string().optional(),
          postCode: z.string().optional(),
          cordinates: z
            .object({
              longitude: z.number().optional(),
              latitude: z.number().optional(),
            })
            .optional(),
        }),
      }),
      error: z.object({
        message: z.string(),
        errorCode: z.string(),
      }),
    }),
  ),
});

export const shiftsAPIResponseSchema = z.object({
  shifts: z.array(shiftSchema),
  pagination: z.object({
    currentPage: z.number().int().positive(),
    totalPages: z.number().int().min(0),
    totalCount: z.number().int().min(0),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
    limit: z.number().int().positive(),
  }),
});
