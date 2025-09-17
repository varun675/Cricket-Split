import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Users, Minus } from "lucide-react";
import { PlayerType, type Player } from "@shared/schema";
import PlayerCard from "./PlayerCard";

interface PlayerSectionProps {
  title: string;
  playerType: PlayerType;
  players: Player[];
  onAddPlayer: (name: string, type: PlayerType) => void;
  onRemovePlayer: (playerId: string) => void;
  minPlayers?: number;
  maxPlayers?: number;
  feeCalculations?: Array<{ playerId: string; amountToPay: number }>;
  canAdjustCount?: boolean;
  onAdjustCount?: (increment: boolean) => void;
  paidByPlayer?: Player | null;
  onPaidByUpdate?: (player: Player) => void;
}

const getPlayerTypeIcon = (type: PlayerType) => {
  return <Users className="h-5 w-5" />;
};

const getPlayerTypeDescription = (type: PlayerType) => {
  switch (type) {
    case PlayerType.CORE:
      return "Core members who contribute to every match and cover unpaid players";
    case PlayerType.SELF_PAID:
      return "Players who pay only their own match fees";
    case PlayerType.UNPAID:
      return "Players who play but don't pay any fees";
  }
};

export default function PlayerSection({
  title,
  playerType,
  players,
  onAddPlayer,
  onRemovePlayer,
  minPlayers = 0,
  maxPlayers = 12,
  feeCalculations = [],
  canAdjustCount = false,
  onAdjustCount,
  paidByPlayer,
  onPaidByUpdate
}: PlayerSectionProps) {
  const [newPlayerName, setNewPlayerName] = useState("");

  const handleAddPlayer = () => {
    if (newPlayerName.trim() && players.length < maxPlayers) {
      onAddPlayer(newPlayerName.trim(), playerType);
      setNewPlayerName("");
      console.log(`Added ${playerType} player: ${newPlayerName}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddPlayer();
    }
  };

  const canRemovePlayer = (playerId: string) => {
    return players.length > minPlayers;
  };

  const getPlayerFees = (playerId: string) => {
    const calculation = feeCalculations.find(calc => calc.playerId === playerId);
    return calculation?.amountToPay || 0;
  };

  return (
    <Card data-testid={`section-${playerType}-players`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getPlayerTypeIcon(playerType)}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {getPlayerTypeDescription(playerType)}
              </p>
            </div>
          </div>
          
          {canAdjustCount && onAdjustCount && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onAdjustCount(false)}
                disabled={players.length <= minPlayers}
                data-testid={`button-decrease-${playerType}`}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-8 text-center">
                {players.length}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onAdjustCount(true)}
                disabled={players.length >= maxPlayers}
                data-testid={`button-increase-${playerType}`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder={`Add ${playerType} player...`}
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={players.length >= maxPlayers}
            data-testid={`input-add-${playerType}-player`}
          />
          <Button
            onClick={handleAddPlayer}
            disabled={!newPlayerName.trim() || players.length >= maxPlayers}
            data-testid={`button-add-${playerType}-player`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {players.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No {playerType} players added yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                id={player.id}
                name={player.name}
                type={player.type}
                amountToPay={getPlayerFees(player.id)}
                onRemove={onRemovePlayer}
                canRemove={canRemovePlayer(player.id)}
                isPaidBy={player.type === PlayerType.CORE && paidByPlayer?.id === player.id}
                onPaidByChange={player.type === PlayerType.CORE && onPaidByUpdate ? () => onPaidByUpdate(player) : undefined}
              />
            ))}
          </div>
        )}

        {players.length >= maxPlayers && (
          <p className="text-xs text-muted-foreground text-center">
            Maximum {maxPlayers} players reached
          </p>
        )}
      </CardContent>
    </Card>
  );
}