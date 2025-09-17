import PlayerCard from '../PlayerCard';
import { PlayerType } from '@shared/schema';

export default function PlayerCardExample() {
  const handleRemove = (id: string) => {
    console.log(`Remove player: ${id}`);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <PlayerCard
        id="1"
        name="Virat Kohli"
        type={PlayerType.CORE}
        amountToPay={500}
        onRemove={handleRemove}
      />
      
      <PlayerCard
        id="2"
        name="MS Dhoni"
        type={PlayerType.SELF_PAID}
        amountToPay={364}
        onRemove={handleRemove}
      />
      
      <PlayerCard
        id="3"
        name="Rohit Sharma"
        type={PlayerType.UNPAID}
        amountToPay={0}
        onRemove={handleRemove}
        canRemove={false}
      />
    </div>
  );
}