import MatchForm from '../MatchForm';

export default function MatchFormExample() {
  const handleMatchCreate = (matchName: string, totalFees: number) => {
    console.log(`Match created: ${matchName} with fees ₹${totalFees}`);
  };

  return (
    <div className="max-w-md mx-auto">
      <MatchForm 
        onMatchCreate={handleMatchCreate}
      />
    </div>
  );
}