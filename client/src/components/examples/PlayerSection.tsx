import PlayerSection from '../PlayerSection';
import { PlayerType } from '@shared/schema';

export default function PlayerSectionExample() {
  // todo: remove mock functionality
  const mockPlayers = [
    { id: '1', name: 'Virat Kohli', type: PlayerType.CORE },
    { id: '2', name: 'MS Dhoni', type: PlayerType.CORE },
    { id: '3', name: 'Rohit Sharma', type: PlayerType.CORE },
  ];

  // todo: remove mock functionality
  const mockFeeCalculations = [
    { playerId: '1', amountToPay: 500 },
    { playerId: '2', amountToPay: 500 },
    { playerId: '3', amountToPay: 500 },
  ];

  const handleAddPlayer = (name: string, type: PlayerType) => {
    console.log(`Add player: ${name} as ${type}`);
  };

  const handleRemovePlayer = (playerId: string) => {
    console.log(`Remove player: ${playerId}`);
  };

  const handleAdjustCount = (increment: boolean) => {
    console.log(`Adjust count: ${increment ? 'increment' : 'decrement'}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PlayerSection
        title="Core Players"
        playerType={PlayerType.CORE}
        players={mockPlayers}
        onAddPlayer={handleAddPlayer}
        onRemovePlayer={handleRemovePlayer}
        minPlayers={2}
        maxPlayers={12}
        feeCalculations={mockFeeCalculations}
        canAdjustCount={true}
        onAdjustCount={handleAdjustCount}
      />
    </div>
  );
}