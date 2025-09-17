import FeeCalculation from '../FeeCalculation';
import { PlayerType } from '@shared/schema';

export default function FeeCalculationExample() {
  // todo: remove mock functionality
  const mockCalculations = [
    {
      playerId: '1',
      playerName: 'Virat Kohli',
      playerType: PlayerType.CORE,
      amountToPay: 500
    },
    {
      playerId: '2',
      playerName: 'MS Dhoni',
      playerType: PlayerType.CORE,
      amountToPay: 500
    },
    {
      playerId: '3',
      playerName: 'Rohit Sharma',
      playerType: PlayerType.SELF_PAID,
      amountToPay: 364
    },
    {
      playerId: '4',
      playerName: 'Hardik Pandya',
      playerType: PlayerType.SELF_PAID,
      amountToPay: 364
    },
    {
      playerId: '5',
      playerName: 'Jasprit Bumrah',
      playerType: PlayerType.UNPAID,
      amountToPay: 0
    },
    {
      playerId: '6',
      playerName: 'Ravindra Jadeja',
      playerType: PlayerType.UNPAID,
      amountToPay: 0
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <FeeCalculation
        matchName="United vs Lions - Saturday League"
        totalFees={4000}
        calculations={mockCalculations}
        totalPlayers={11}
      />
    </div>
  );
}