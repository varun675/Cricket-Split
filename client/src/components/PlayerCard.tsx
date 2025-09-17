import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, User } from "lucide-react";
import { PlayerType } from "@shared/schema";

interface PlayerCardProps {
  id: string;
  name: string;
  type: PlayerType;
  amountToPay: number;
  onRemove?: (id: string) => void;
  canRemove?: boolean;
  isPaidBy?: boolean;
  onPaidByChange?: () => void;
}

const getPlayerTypeLabel = (type: PlayerType) => {
  switch (type) {
    case PlayerType.CORE:
      return "Core Player";
    case PlayerType.SELF_PAID:
      return "Self-Paid";
    case PlayerType.UNPAID:
      return "Unpaid";
  }
};

const getPlayerTypeBadgeVariant = (type: PlayerType) => {
  switch (type) {
    case PlayerType.CORE:
      return "default";
    case PlayerType.SELF_PAID:
      return "secondary";
    case PlayerType.UNPAID:
      return "outline";
  }
};

export default function PlayerCard({ 
  id, 
  name, 
  type, 
  amountToPay, 
  onRemove,
  canRemove = true,
  isPaidBy = false,
  onPaidByChange
}: PlayerCardProps) {
  const handleRemove = () => {
    if (onRemove) {
      onRemove(id);
      console.log(`Removing player: ${name}`);
    }
  };

  return (
    <Card className="hover-elevate" data-testid={`card-player-${id}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm" data-testid={`text-player-name-${id}`}>
                {name}
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={getPlayerTypeBadgeVariant(type)}
                  className="text-xs mt-1"
                  data-testid={`badge-player-type-${id}`}
                >
                  {getPlayerTypeLabel(type)}
                </Badge>
                {type === PlayerType.CORE && onPaidByChange && (
                  <label className="flex items-center gap-1 text-xs text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPaidBy}
                      onChange={onPaidByChange}
                      className="h-3 w-3"
                    />
                    Paid by
                  </label>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div 
                className={`font-semibold text-sm ${
                  amountToPay > 0 ? 'text-foreground' : 'text-muted-foreground'
                }`}
                data-testid={`text-amount-${id}`}
              >
                ₹{amountToPay.toFixed(0)}
              </div>
              {amountToPay === 0 && (
                <div className="text-xs text-muted-foreground">Free</div>
              )}
            </div>
            
            {canRemove && onRemove && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={handleRemove}
                data-testid={`button-remove-${id}`}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}