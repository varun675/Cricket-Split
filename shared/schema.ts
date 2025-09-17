import { z } from "zod";

// Player types for the cricket team
export enum PlayerType {
  CORE = "core",
  SELF_PAID = "self_paid",
  UNPAID = "unpaid"
}

// Player schema
export const playerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Player name is required"),
  type: z.nativeEnum(PlayerType),
});

// Match schema
export const matchSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Match name is required"),
  totalFees: z.number().min(0, "Match fees must be positive"),
  players: z.array(playerSchema).min(2, "At least 2 players required").max(12, "Maximum 12 players allowed"),
  createdAt: z.date(),
});

// Fee calculation result
export const feeCalculationSchema = z.object({
  playerId: z.string(),
  playerName: z.string(),
  playerType: z.nativeEnum(PlayerType),
  amountToPay: z.number(),
});

// Insert schemas
export const insertPlayerSchema = playerSchema.omit({ id: true });
export const insertMatchSchema = matchSchema.omit({ id: true, createdAt: true });

// Types
export type Player = z.infer<typeof playerSchema>;
export type Match = z.infer<typeof matchSchema>;
export type FeeCalculation = z.infer<typeof feeCalculationSchema>;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
