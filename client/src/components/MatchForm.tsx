import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trophy, IndianRupee } from "lucide-react";

interface MatchFormProps {
  onMatchCreate: (matchName: string, totalFees: number) => void;
  disabled?: boolean;
}

export default function MatchForm({ onMatchCreate, disabled = false }: MatchFormProps) {
  const [matchName, setMatchName] = useState("");
  const [totalFees, setTotalFees] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fees = parseFloat(totalFees);
    if (matchName.trim() && !isNaN(fees) && fees > 0) {
      onMatchCreate(matchName.trim(), fees);
      console.log(`Match created: ${matchName}, Fees: ₹${fees}`);
    }
  };

  const isValid = matchName.trim() && !isNaN(parseFloat(totalFees)) && parseFloat(totalFees) > 0;

  return (
    <Card className="w-full" data-testid="card-match-form">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Match Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="match-name">Match Name</Label>
            <Input
              id="match-name"
              data-testid="input-match-name"
              type="text"
              placeholder="e.g., United vs Lions - Saturday League"
              value={matchName}
              onChange={(e) => setMatchName(e.target.value)}
              disabled={disabled}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="total-fees">Total Match Fees</Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="total-fees"
                data-testid="input-total-fees"
                type="number"
                placeholder="4000"
                className="pl-10"
                value={totalFees}
                onChange={(e) => setTotalFees(e.target.value)}
                min="0"
                step="50"
                disabled={disabled}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            data-testid="button-create-match"
            disabled={!isValid || disabled}
            className="w-full"
          >
            Create Match
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}