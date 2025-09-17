import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PlayerType, type FeeCalculation } from "@shared/schema";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2a2a2a',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    borderBottomStyle: 'solid',
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    color: '#666666',
  },
  value: {
    fontSize: 12,
    color: '#333333',
    fontWeight: 'bold',
  },
  playerSection: {
    marginTop: 15,
  },
  playerType: {
    fontSize: 14,
    color: '#444444',
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

interface MatchDetailsPdfProps {
  matchName: string;
  totalFees: number;
  calculations: FeeCalculation[];
  paidByPlayer: { id: string; name: string } | null;
  totalPlayers: number;
}

const formatCurrency = (amount: number) => `₹${amount.toFixed(0)}`;

export function MatchDetailsPdf({ 
  matchName, 
  totalFees, 
  calculations, 
  paidByPlayer,
  totalPlayers 
}: MatchDetailsPdfProps) {
  const coreCalculations = calculations.filter(calc => calc.playerType === PlayerType.CORE);
  const selfPaidCalculations = calculations.filter(calc => calc.playerType === PlayerType.SELF_PAID);
  const unpaidCalculations = calculations.filter(calc => calc.playerType === PlayerType.UNPAID);
  
  const baseAmountPerPlayer = totalPlayers > 0 ? totalFees / totalPlayers : 0;
  const unpaidAmount = unpaidCalculations.length * baseAmountPerPlayer;
  const extraAmountPerCore = coreCalculations.length > 0 ? unpaidAmount / coreCalculations.length : 0;
  
  const amountToReceiveBack = paidByPlayer 
    ? totalFees - (calculations.find(calc => calc.playerId === paidByPlayer.id)?.amountToPay || 0)
    : 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>{matchName} - Match Details</Text>
          
          {/* Summary Section */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>Summary</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Total Fees:</Text>
              <Text style={styles.value}>{formatCurrency(totalFees)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Total Players:</Text>
              <Text style={styles.value}>{totalPlayers}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Base Amount per Player:</Text>
              <Text style={styles.value}>{formatCurrency(baseAmountPerPlayer)}</Text>
            </View>
            {paidByPlayer && (
              <>
                <View style={styles.row}>
                  <Text style={styles.label}>Paid by:</Text>
                  <Text style={styles.value}>{paidByPlayer.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Amount to Receive Back:</Text>
                  <Text style={styles.value}>{formatCurrency(amountToReceiveBack)}</Text>
                </View>
              </>
            )}
          </View>

          {/* Players Breakdown */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>Fee Breakdown by Player Type</Text>
            
            {/* Core Players */}
            {coreCalculations.length > 0 && (
              <View style={styles.playerSection}>
                <Text style={styles.playerType}>Core Players</Text>
                {coreCalculations.map((calc) => (
                  <View key={calc.playerId} style={styles.row}>
                    <Text style={styles.label}>{calc.playerName}</Text>
                    <Text style={styles.value}>{formatCurrency(calc.amountToPay)}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Self Paid Players */}
            {selfPaidCalculations.length > 0 && (
              <View style={styles.playerSection}>
                <Text style={styles.playerType}>Self-Paid Players</Text>
                {selfPaidCalculations.map((calc) => (
                  <View key={calc.playerId} style={styles.row}>
                    <Text style={styles.label}>{calc.playerName}</Text>
                    <Text style={styles.value}>{formatCurrency(calc.amountToPay)}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Unpaid Players */}
            {unpaidCalculations.length > 0 && (
              <View style={styles.playerSection}>
                <Text style={styles.playerType}>Unpaid Players</Text>
                {unpaidCalculations.map((calc) => (
                  <View key={calc.playerId} style={styles.row}>
                    <Text style={styles.label}>{calc.playerName}</Text>
                    <Text style={styles.value}>{formatCurrency(calc.amountToPay)}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Calculation Details */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>Calculation Details</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Base Amount Calculation:</Text>
              <Text style={styles.value}>
                {formatCurrency(totalFees)} ÷ {totalPlayers} = {formatCurrency(baseAmountPerPlayer)}
              </Text>
            </View>
            {coreCalculations.length > 0 && (
              <View style={styles.row}>
                <Text style={styles.label}>Extra per Core Player:</Text>
                <Text style={styles.value}>{formatCurrency(extraAmountPerCore)}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
