import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Users, IndianRupee, Download } from "lucide-react";
import { PlayerType, type FeeCalculation } from "@shared/schema";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MatchDetailsPdf } from "./MatchDetailsPdf";

interface FeeCalculationProps {
  matchName: string;
  totalFees: number;
  calculations: FeeCalculation[];
  totalPlayers: number;
  paidByPlayer: { id: string; name: string } | null;
}

export default function FeeCalculation({ 
  matchName, 
  totalFees, 
  calculations, 
  totalPlayers,
  paidByPlayer
}: FeeCalculationProps) {
  const corePlayerCalculations = calculations.filter(calc => calc.playerType === PlayerType.CORE);
  const selfPaidCalculations = calculations.filter(calc => calc.playerType === PlayerType.SELF_PAID);
  const unpaidCalculations = calculations.filter(calc => calc.playerType === PlayerType.UNPAID);
  
  const totalCollected = calculations.reduce((sum, calc) => sum + calc.amountToPay, 0);
  const payingPlayers = corePlayerCalculations.length + selfPaidCalculations.length;
  const baseAmountPerPlayer = totalPlayers > 0 ? totalFees / totalPlayers : 0;
  const unpaidAmount = unpaidCalculations.length * baseAmountPerPlayer;
  const extraAmountPerCore = corePlayerCalculations.length > 0 ? unpaidAmount / corePlayerCalculations.length : 0;

  return (
    <Card data-testid="card-fee-calculation">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Fee Breakdown
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Match: {matchName}
            </p>
          </div>
          
          <PDFDownloadLink
            document={
              <MatchDetailsPdf
                matchName={matchName}
                totalFees={totalFees}
                calculations={calculations}
                paidByPlayer={paidByPlayer}
                totalPlayers={totalPlayers}
              />
            }
            fileName={`${matchName.replace(/\s+/g, '-')}-match-details.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline" size="sm" disabled={loading}>
                <Download className="h-4 w-4 mr-2" />
                {loading ? 'Preparing...' : 'Download PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        {paidByPlayer && (
          <div className="bg-muted rounded-md p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Paid by:</span>
                <span className="font-medium ml-2">{paidByPlayer.name}</span>
              </div>
              <Badge variant="secondary" className="text-sm">₹{totalFees}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">To receive back:</span>
              </div>
              <Badge variant="default" className="text-sm">
                ₹{(totalFees - (calculations.find(calc => calc.playerId === paidByPlayer.id)?.amountToPay || 0)).toFixed(0)}
              </Badge>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded-md">
            <IndianRupee className="h-4 w-4 mx-auto mb-1 text-primary" />
            <div className="font-semibold text-lg" data-testid="text-total-fees">₹{totalFees}</div>
            <div className="text-xs text-muted-foreground">Total Fees</div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-md">
            <Users className="h-4 w-4 mx-auto mb-1 text-primary" />
            <div className="font-semibold text-lg" data-testid="text-total-players">{totalPlayers}</div>
            <div className="text-xs text-muted-foreground">Total Players</div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-md">
            <TrendingUp className="h-4 w-4 mx-auto mb-1 text-primary" />
            <div className="font-semibold text-lg" data-testid="text-base-amount">₹{baseAmountPerPlayer.toFixed(0)}</div>
            <div className="text-xs text-muted-foreground">Base Amount</div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-md">
            <Calculator className="h-4 w-4 mx-auto mb-1 text-primary" />
            <div className="font-semibold text-lg" data-testid="text-total-collected">₹{totalCollected}</div>
            <div className="text-xs text-muted-foreground">Total Collected</div>
          </div>
        </div>

        {/* Calculation Logic */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Calculation Logic:</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <span>Base amount per player:</span>
              <span className="font-medium">₹{totalFees} ÷ {totalPlayers} = ₹{baseAmountPerPlayer.toFixed(0)}</span>
            </div>
            
            {unpaidCalculations.length > 0 && (
              <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                <span>Unpaid players cost:</span>
                <span className="font-medium">
                  {unpaidCalculations.length} × ₹{baseAmountPerPlayer.toFixed(0)} = ₹{unpaidAmount.toFixed(0)}
                </span>
              </div>
            )}
            
            {corePlayerCalculations.length > 0 && unpaidCalculations.length > 0 && (
              <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                <span>Extra per core player:</span>
                <span className="font-medium">
                  ₹{unpaidAmount.toFixed(0)} ÷ {corePlayerCalculations.length} = ₹{extraAmountPerCore.toFixed(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Player Type Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Payment Breakdown:</h4>
          
          {corePlayerCalculations.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="default">Core Players</Badge>
                <span className="text-sm text-muted-foreground">
                  ({corePlayerCalculations.length} players)
                </span>
              </div>
              {corePlayerCalculations.map((calc) => (
                <div 
                  key={calc.playerId} 
                  className="flex justify-between items-center py-1 text-sm"
                  data-testid={`fee-core-${calc.playerId}`}
                >
                  <span>{calc.playerName}</span>
                  <span className="font-medium">₹{calc.amountToPay}</span>
                </div>
              ))}
            </div>
          )}

          {selfPaidCalculations.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Self-Paid Players</Badge>
                <span className="text-sm text-muted-foreground">
                  ({selfPaidCalculations.length} players)
                </span>
              </div>
              {selfPaidCalculations.map((calc) => (
                <div 
                  key={calc.playerId} 
                  className="flex justify-between items-center py-1 text-sm"
                  data-testid={`fee-self-paid-${calc.playerId}`}
                >
                  <span>{calc.playerName}</span>
                  <span className="font-medium">₹{calc.amountToPay}</span>
                </div>
              ))}
            </div>
          )}

          {unpaidCalculations.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Unpaid Players</Badge>
                <span className="text-sm text-muted-foreground">
                  ({unpaidCalculations.length} players)
                </span>
              </div>
              {unpaidCalculations.map((calc) => (
                <div 
                  key={calc.playerId} 
                  className="flex justify-between items-center py-1 text-sm"
                  data-testid={`fee-unpaid-${calc.playerId}`}
                >
                  <span>{calc.playerName}</span>
                  <span className="font-medium text-muted-foreground">₹0 (Free)</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}