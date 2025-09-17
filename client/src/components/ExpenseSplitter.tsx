import { useState } from "react";
import MatchForm from "./MatchForm";
import PlayerSection from "./PlayerSection";
import FeeCalculationDisplay from "./FeeCalculation";
import { PlayerType, type Player, type FeeCalculation } from "@shared/schema";

// Browser-compatible UUID generation
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function ExpenseSplitter() {
  const [matchName, setMatchName] = useState("");
  const [totalFees, setTotalFees] = useState(0);
  const [hasMatch, setHasMatch] = useState(false);
  
  // Player states
  const [corePlayers, setCorePlayers] = useState<Player[]>([]);
  const [selfPaidPlayers, setSelfPaidPlayers] = useState<Player[]>([]);
  const [unpaidPlayers, setUnpaidPlayers] = useState<Player[]>([]);
  const [paidByPlayer, setPaidByPlayer] = useState<Player | null>(null);

  // Calculate fees based on the logic described
  const calculateFees = (): FeeCalculation[] => {
    const allPlayers = [...corePlayers, ...selfPaidPlayers, ...unpaidPlayers];
    const totalPlayers = allPlayers.length;
    
    if (totalPlayers === 0 || totalFees === 0) {
      return [];
    }

    const baseAmountPerPlayer = totalFees / totalPlayers;
    const unpaidAmount = unpaidPlayers.length * baseAmountPerPlayer;
    const extraAmountPerCore = corePlayers.length > 0 ? unpaidAmount / corePlayers.length : 0;

    const calculations: FeeCalculation[] = [];

    // Core players pay base amount + extra for unpaid players
    corePlayers.forEach(player => {
      calculations.push({
        playerId: player.id,
        playerName: player.name,
        playerType: PlayerType.CORE,
        amountToPay: baseAmountPerPlayer + extraAmountPerCore
      });
    });

    // Self-paid players pay only base amount
    selfPaidPlayers.forEach(player => {
      calculations.push({
        playerId: player.id,
        playerName: player.name,
        playerType: PlayerType.SELF_PAID,
        amountToPay: baseAmountPerPlayer
      });
    });

    // Unpaid players pay nothing
    unpaidPlayers.forEach(player => {
      calculations.push({
        playerId: player.id,
        playerName: player.name,
        playerType: PlayerType.UNPAID,
        amountToPay: 0
      });
    });

    return calculations;
  };

  const handleMatchCreate = (name: string, fees: number) => {
    setMatchName(name);
    setTotalFees(fees);
    setHasMatch(true);
    console.log(`Match created: ${name} with total fees ₹${fees}`);
  };

  const handleAddPlayer = (name: string, type: PlayerType) => {
    // Check if adding this player would exceed maximum team size
    if (totalPlayers >= 12) {
      console.log("Cannot add player - maximum team size of 12 reached");
      return;
    }

    const newPlayer: Player = {
      id: generateUUID(),
      name,
      type
    };

    switch (type) {
      case PlayerType.CORE:
        setCorePlayers(prev => [...prev, newPlayer]);
        break;
      case PlayerType.SELF_PAID:
        setSelfPaidPlayers(prev => [...prev, newPlayer]);
        break;
      case PlayerType.UNPAID:
        setUnpaidPlayers(prev => [...prev, newPlayer]);
        break;
    }
    console.log(`Added ${type} player: ${name}`);
  };

  const handleRemovePlayer = (playerId: string) => {
    // Check if removing this player would go below minimum team size
    if (totalPlayers <= 11) {
      console.log("Cannot remove player - minimum team size of 11 required");
      return;
    }

    setCorePlayers(prev => prev.filter(p => p.id !== playerId));
    setSelfPaidPlayers(prev => prev.filter(p => p.id !== playerId));
    setUnpaidPlayers(prev => prev.filter(p => p.id !== playerId));
    console.log(`Removed player: ${playerId}`);
  };

  const handleCoreCountAdjust = (increment: boolean) => {
    if (increment) {
      // Add a placeholder core player if team size allows
      if (totalPlayers < 12) {
        handleAddPlayer(`Core Player ${corePlayers.length + 1}`, PlayerType.CORE);
      }
    } else if (corePlayers.length > 2 && totalPlayers > 11) {
      // Remove the last core player (ensuring minimum 2 core players and 11 total players)
      const lastPlayer = corePlayers[corePlayers.length - 1];
      if (lastPlayer) {
        handleRemovePlayer(lastPlayer.id);
      }
    }
  };

  const handleSelfPaidCountAdjust = (increment: boolean) => {
    if (increment) {
      // Add a placeholder self-paid player if team size allows
      if (totalPlayers < 12) {
        handleAddPlayer(`Self-Paid Player ${selfPaidPlayers.length + 1}`, PlayerType.SELF_PAID);
      }
    } else if (selfPaidPlayers.length > 0 && totalPlayers > 11) {
      // Remove the last self-paid player
      const lastPlayer = selfPaidPlayers[selfPaidPlayers.length - 1];
      if (lastPlayer) {
        handleRemovePlayer(lastPlayer.id);
      }
    }
  };

  const handleUnpaidCountAdjust = (increment: boolean) => {
    if (increment) {
      // Add a placeholder unpaid player if team size allows
      if (totalPlayers < 12) {
        handleAddPlayer(`Unpaid Player ${unpaidPlayers.length + 1}`, PlayerType.UNPAID);
      }
    } else if (unpaidPlayers.length > 0 && totalPlayers > 11) {
      // Remove the last unpaid player
      const lastPlayer = unpaidPlayers[unpaidPlayers.length - 1];
      if (lastPlayer) {
        handleRemovePlayer(lastPlayer.id);
      }
    }
  };

  const handlePaidByUpdate = (player: Player) => {
    setPaidByPlayer(paidByPlayer?.id === player.id ? null : player);
  };

  const resetMatch = () => {
    setHasMatch(false);
    setMatchName("");
    setTotalFees(0);
    setCorePlayers([]);
    setSelfPaidPlayers([]);
    setUnpaidPlayers([]);
    console.log("Match reset");
  };

  const feeCalculations = calculateFees();
  const totalPlayers = corePlayers.length + selfPaidPlayers.length + unpaidPlayers.length;
  const isValidTeamSize = totalPlayers >= 11 && totalPlayers <= 12;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Team Split
          </h1>
          <p className="text-muted-foreground">
            Cricket team expense sharing for Team United 77
          </p>
        </div>

        <div className="space-y-6">
          {/* Match Form */}
          <MatchForm 
            onMatchCreate={handleMatchCreate}
            disabled={hasMatch}
          />

          {hasMatch && (
            <>
              {/* Team Size Status and Reset Button */}
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-muted-foreground">Team Size: </span>
                  <span className={`font-medium ${
                    isValidTeamSize ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {totalPlayers}/12 players
                  </span>
                  {!isValidTeamSize && (
                    <span className="text-xs text-muted-foreground ml-2">
                      (Need {totalPlayers < 11 ? `${11 - totalPlayers} more` : 'max 12 players'})
                    </span>
                  )}
                </div>
                <button
                  onClick={resetMatch}
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-testid="button-reset-match"
                >
                  Start New Match
                </button>
              </div>

              {/* Player Sections */}
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                <div className="space-y-6">
                  <PlayerSection
                    title="Core Players"
                    playerType={PlayerType.CORE}
                    players={corePlayers}
                    onAddPlayer={handleAddPlayer}
                    onRemovePlayer={handleRemovePlayer}
                    minPlayers={2}
                    maxPlayers={totalPlayers >= 12 ? corePlayers.length : 12}
                    feeCalculations={feeCalculations}
                    canAdjustCount={true}
                    onAdjustCount={handleCoreCountAdjust}
                    paidByPlayer={paidByPlayer}
                    onPaidByUpdate={handlePaidByUpdate}
                  />

                  <PlayerSection
                    title="Self-Paid Players"
                    playerType={PlayerType.SELF_PAID}
                    players={selfPaidPlayers}
                    onAddPlayer={handleAddPlayer}
                    onRemovePlayer={handleRemovePlayer}
                    minPlayers={0}
                    maxPlayers={totalPlayers >= 12 ? selfPaidPlayers.length : 12}
                    feeCalculations={feeCalculations}
                    canAdjustCount={true}
                    onAdjustCount={handleSelfPaidCountAdjust}
                  />
                </div>

                <div className="space-y-6">
                  <PlayerSection
                    title="Unpaid Players"
                    playerType={PlayerType.UNPAID}
                    players={unpaidPlayers}
                    onAddPlayer={handleAddPlayer}
                    onRemovePlayer={handleRemovePlayer}
                    minPlayers={0}
                    maxPlayers={totalPlayers >= 12 ? unpaidPlayers.length : 12}
                    feeCalculations={feeCalculations}
                    canAdjustCount={true}
                    onAdjustCount={handleUnpaidCountAdjust}
                  />

                  {/* Fee Calculation */}
                  {totalPlayers > 0 && (
                    <FeeCalculationDisplay
                      matchName={matchName}
                      totalFees={totalFees}
                      calculations={feeCalculations}
                      totalPlayers={totalPlayers}
                      paidByPlayer={paidByPlayer}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}