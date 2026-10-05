import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [temperature, setTemperature] = useState(null);

  // Starts our simulated voice interaction.
  const startVoiceCommand = () => {
    setScreen('ambiguous');
  };

  // User chooses a specific temperature.
  const chooseTemperature = (temp) => {
    setTemperature(temp);
    setScreen('confirm');
  };

  // User confirms the command.
  const confirmCommand = () => {
    setScreen('complete');
  };

  // User cancels everything.
  const cancelCommand = () => {
    setTemperature(null);
    setScreen('cancelled');
  };

  // Reset prototype.
  const startOver = () => {
    setTemperature(null);
    setScreen('home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HOME SCREEN */}
      {screen === 'home' && (
        <View style={styles.content}>
          <Text style={styles.smallTitle}>EXPLICIT MODE</Text>

          <Text style={styles.title}>
            Voice Assistant
          </Text>

          <Text style={styles.description}>
            I will show you what I understood before making a change.
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>
              Nothing will happen without your confirmation.
            </Text>
          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={startVoiceCommand}
            accessibilityRole="button"
            accessibilityLabel="Simulate voice command"
          >
            <Text style={styles.primaryButtonText}>
              🎤 Say: "Make it cooler"
            </Text>
          </Pressable>
        </View>
      )}

      {/* AMBIGUOUS COMMAND SCREEN */}
      {screen === 'ambiguous' && (
        <View style={styles.content}>
          <Text style={styles.smallTitle}>I NEED MORE INFORMATION</Text>

          <Text style={styles.title}>
            "Make it cooler" could mean more than one thing.
          </Text>

          <Text style={styles.description}>
            What would you like me to do?
          </Text>

          <Pressable
            style={styles.optionButton}
            onPress={() => setScreen('lowerTwo')}
          >
            <Text style={styles.optionText}>
              Lower temperature by 2°F
            </Text>
          </Pressable>

          <Pressable
            style={styles.optionButton}
            onPress={() => setScreen('temperature')}
          >
            <Text style={styles.optionText}>
              Choose a temperature
            </Text>
          </Pressable>

          <Pressable
            style={styles.optionButton}
            onPress={() => setScreen('fan')}
          >
            <Text style={styles.optionText}>
              Turn on the fan
            </Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={cancelCommand}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      )}

      {/* TEMPERATURE CHOICE SCREEN */}
      {screen === 'temperature' && (
        <View style={styles.content}>
          <Text style={styles.smallTitle}>CHOOSE ONE</Text>

          <Text style={styles.title}>
            What temperature would you like?
          </Text>

          <Text style={styles.description}>
            Select one option.
          </Text>

          {[68, 70, 72].map((temp) => (
            <Pressable
              key={temp}
              style={styles.temperatureButton}
              onPress={() => chooseTemperature(temp)}
              accessibilityRole="button"
              accessibilityLabel={`Set temperature to ${temp} degrees`}
            >
              <Text style={styles.temperatureText}>
                {temp}°F
              </Text>
            </Pressable>
          ))}

          <Pressable
            style={styles.backButton}
            onPress={() => setScreen('ambiguous')}
          >
            <Text style={styles.backText}>Go Back</Text>
          </Pressable>
        </View>
      )}

      {/* CONFIRMATION SCREEN */}
      {screen === 'confirm' && (
        <View style={styles.content}>
          <Text style={styles.smallTitle}>CHECK BEFORE ACTION</Text>

          <Text style={styles.title}>
            Is this correct?
          </Text>

          <View style={styles.commandCard}>
            <Text style={styles.cardLabel}>DEVICE</Text>
            <Text style={styles.cardValue}>Thermostat</Text>

            <Text style={styles.cardLabel}>ACTION</Text>
            <Text style={styles.cardValue}>
              Set temperature
            </Text>

            <Text style={styles.cardLabel}>TEMPERATURE</Text>
            <Text style={styles.bigTemperature}>
              {temperature}°F
            </Text>
          </View>

          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              Nothing has changed yet.
            </Text>
          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={confirmCommand}
          >
            <Text style={styles.primaryButtonText}>
              YES — DO THIS
            </Text>
          </Pressable>

          <Pressable
            style={styles.optionButton}
            onPress={() => setScreen('temperature')}
          >
            <Text style={styles.optionText}>
              Change Temperature
            </Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={cancelCommand}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      )}

      {/* LOWER BY 2 SCREEN */}
      {screen === 'lowerTwo' && (
        <View style={styles.content}>
          <Text style={styles.smallTitle}>CHECK BEFORE ACTION</Text>

          <Text style={styles.title}>
            Lower the thermostat by 2°F?
          </Text>

          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              Nothing has changed yet.
            </Text>
          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={() => setScreen('lowerComplete')}
          >
            <Text style={styles.primaryButtonText}>
              YES — DO THIS
            </Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={cancelCommand}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      )}

      {/* FAN SCREEN */}
      {screen === 'fan' && (
        <View style={styles.content}>
          <Text style={styles.smallTitle}>CHECK BEFORE ACTION</Text>

          <Text style={styles.title}>
            Turn on the fan?
          </Text>

          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              Nothing has changed yet.
            </Text>
          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={() => setScreen('fanComplete')}
          >
            <Text style={styles.primaryButtonText}>
              YES — DO THIS
            </Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={cancelCommand}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      )}

      {/* COMPLETE: TEMPERATURE */}
      {screen === 'complete' && (
        <View style={styles.content}>
          <Text style={styles.success}>✓</Text>

          <Text style={styles.title}>Finished</Text>

          <Text style={styles.result}>
            Thermostat set to {temperature}°F.
          </Text>

          <Text style={styles.description}>
            No other actions were taken.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={startOver}
          >
            <Text style={styles.primaryButtonText}>
              Start Over
            </Text>
          </Pressable>
        </View>
      )}

      {/* COMPLETE: FAN */}
      {screen === 'fanComplete' && (
        <View style={styles.content}>
          <Text style={styles.success}>✓</Text>
          <Text style={styles.title}>Finished</Text>
          <Text style={styles.result}>The fan is now on.</Text>
          <Text style={styles.description}>
            No other actions were taken.
          </Text>

          <Pressable style={styles.primaryButton} onPress={startOver}>
            <Text style={styles.primaryButtonText}>Start Over</Text>
          </Pressable>
        </View>
      )}

      {/* COMPLETE: LOWER */}
      {screen === 'lowerComplete' && (
        <View style={styles.content}>
          <Text style={styles.success}>✓</Text>
          <Text style={styles.title}>Finished</Text>
          <Text style={styles.result}>
            The thermostat was lowered by 2°F.
          </Text>
          <Text style={styles.description}>
            No other actions were taken.
          </Text>

          <Pressable style={styles.primaryButton} onPress={startOver}>
            <Text style={styles.primaryButtonText}>Start Over</Text>
          </Pressable>
        </View>
      )}

      {/* CANCELLED */}
      {screen === 'cancelled' && (
        <View style={styles.content}>
          <Text style={styles.title}>Cancelled</Text>

          <Text style={styles.result}>
            No changes were made.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={startOver}
          >
            <Text style={styles.primaryButtonText}>
              Start Over
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5EF',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 28,
  },

  smallTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 18,
  },

  description: {
    fontSize: 18,
    lineHeight: 27,
    marginBottom: 25,
  },

  infoBox: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 12,
    padding: 18,
    marginBottom: 25,
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: '600',
  },

  primaryButton: {
    backgroundColor: '#263B2A',
    padding: 18,
    borderRadius: 12,
    marginTop: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  optionButton: {
    borderWidth: 2,
    borderColor: '#333',
    padding: 18,
    borderRadius: 12,
    marginTop: 12,
  },

  optionText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

  cancelButton: {
    padding: 18,
    marginTop: 12,
  },

  cancelText: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  temperatureButton: {
    borderWidth: 2,
    borderColor: '#333',
    padding: 22,
    borderRadius: 12,
    marginTop: 12,
  },

  temperatureText: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },

  backButton: {
    padding: 18,
    marginTop: 15,
  },

  backText: {
    textAlign: 'center',
    fontSize: 17,
    textDecorationLine: 'underline',
  },

  commandCard: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 12,
    padding: 22,
    marginBottom: 18,
  },

  cardLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
  },

  cardValue: {
    fontSize: 20,
    marginTop: 4,
  },

  bigTemperature: {
    fontSize: 36,
    fontWeight: '700',
    marginTop: 4,
  },

  warningBox: {
    padding: 16,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 12,
    marginBottom: 12,
  },

  warningText: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },

  success: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 10,
  },

  result: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
});
