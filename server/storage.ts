import { type Match, type InsertMatch } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getMatch(id: string): Promise<Match | undefined>;
  createMatch(match: InsertMatch): Promise<Match>;
  getAllMatches(): Promise<Match[]>;
}

export class MemStorage implements IStorage {
  private matches: Map<string, Match>;

  constructor() {
    this.matches = new Map();
  }

  async getMatch(id: string): Promise<Match | undefined> {
    return this.matches.get(id);
  }

  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const id = randomUUID();
    const match: Match = { 
      ...insertMatch, 
      id,
      createdAt: new Date()
    };
    this.matches.set(id, match);
    return match;
  }

  async getAllMatches(): Promise<Match[]> {
    return Array.from(this.matches.values());
  }
}

export const storage = new MemStorage();
