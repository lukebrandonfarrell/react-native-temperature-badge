import type { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  TemperatureProvider,
  TemperatureFrame,
  TemperatureLabel,
} from 'react-native-temperature-badge';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

export default function App() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Section title="Units: °C, °F, K">
        <TemperatureProvider value={22} display="celsius">
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider value={72} display="fahrenheit">
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider value={295.15} display="kelvin">
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
      </Section>

      <Section title="Temperatures (default scale)">
        <TemperatureProvider value={-5} display="celsius">
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider value={8} display="celsius">
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider value={18} display="celsius">
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider value={28} display="celsius">
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider value={38} display="celsius">
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
      </Section>

      <Section title="Custom band colors">
        <TemperatureProvider
          value={20}
          display="celsius"
          colors={{ warm: '#FF6B9D', hot: '#C44569' }}
        >
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider
          value={20}
          display="celsius"
          colors={{ cold: '#0EA5E9', cool: '#06B6D4', mild: '#10B981' }}
        >
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider
          value={25}
          display="celsius"
          colors={{
            veryCold: '#A78BFA',
            cold: '#C084FC',
            cool: '#E879F9',
            mild: '#F472B6',
            warm: '#FB923C',
            hot: '#FBBF24',
          }}
        >
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
      </Section>

      <Section title="Custom color scales">
        <TemperatureProvider
          value={15}
          display="celsius"
          colorScale={[
            { celsius: -20, color: '#1E3A5F' },
            { celsius: 0, color: '#3B82F6' },
            { celsius: 20, color: '#22C55E' },
            { celsius: 40, color: '#EF4444' },
          ]}
        >
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider
          value={72}
          display="fahrenheit"
          colorScale={[
            { fahrenheit: 32, color: '#EC4899' },
            { fahrenheit: 70, color: '#8B5CF6' },
            { fahrenheit: 100, color: '#F59E0B' },
          ]}
        >
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider
          value={10}
          display="celsius"
          colorScale={[
            { celsius: -10, color: '#0F172A' },
            { celsius: 30, color: '#F8FAFC' },
          ]}
        >
          <TemperatureFrame>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
      </Section>

      <Section title="Square & minimal frames">
        <TemperatureProvider value={21} display="celsius">
          <TemperatureFrame style={{ borderRadius: 0 }}>
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider value={21} display="celsius">
          <TemperatureFrame
            style={{
              borderRadius: 6,
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
          >
            <TemperatureLabel style={{ fontSize: 12 }} />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider value={21} display="celsius">
          <TemperatureFrame
            style={{
              borderRadius: 0,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderWidth: 2,
              borderColor: 'rgba(0,0,0,0.2)',
            }}
          >
            <TemperatureLabel />
          </TemperatureFrame>
        </TemperatureProvider>
      </Section>

      <Section title="Huge text & chunky">
        <TemperatureProvider value={24} display="celsius">
          <TemperatureFrame
            style={{
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 12,
            }}
          >
            <TemperatureLabel style={{ fontSize: 28, fontWeight: '800' }} />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider value={24} display="celsius">
          <TemperatureFrame
            style={{
              paddingHorizontal: 28,
              paddingVertical: 16,
              borderRadius: 16,
            }}
          >
            <TemperatureLabel style={{ fontSize: 36, fontWeight: '700' }} />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider value={24} display="celsius">
          <TemperatureFrame
            style={{
              paddingHorizontal: 32,
              paddingVertical: 18,
              borderRadius: 999,
            }}
          >
            <TemperatureLabel style={{ fontSize: 42, fontWeight: '900' }} />
          </TemperatureFrame>
        </TemperatureProvider>
      </Section>

      <Section title="Label styles">
        <TemperatureProvider value={19} display="celsius">
          <TemperatureFrame>
            <TemperatureLabel
              style={{
                color: '#FFF',
                textShadowColor: 'rgba(0,0,0,0.3)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider value={19} display="celsius">
          <TemperatureFrame style={{ borderRadius: 0 }}>
            <TemperatureLabel
              style={{ fontSize: 11, fontWeight: '400', letterSpacing: 1 }}
            />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider value={19} display="celsius">
          <TemperatureFrame
            style={{ paddingHorizontal: 24, paddingVertical: 10 }}
          >
            <TemperatureLabel style={{ fontSize: 20, fontWeight: '300' }} />
          </TemperatureFrame>
        </TemperatureProvider>
      </Section>

      <Section title="Mixed: custom scale + square + huge">
        <TemperatureProvider
          value={35}
          display="celsius"
          colorScale={[
            { celsius: 0, color: '#1E40AF' },
            { celsius: 25, color: '#F97316' },
            { celsius: 50, color: '#DC2626' },
          ]}
        >
          <TemperatureFrame
            style={{
              borderRadius: 4,
              paddingHorizontal: 24,
              paddingVertical: 14,
            }}
          >
            <TemperatureLabel style={{ fontSize: 24, fontWeight: '800' }} />
          </TemperatureFrame>
        </TemperatureProvider>
        <TemperatureProvider
          value={0}
          display="fahrenheit"
          colorScale={[
            { fahrenheit: -20, color: '#1E3A8A' },
            { fahrenheit: 50, color: '#FEF3C7' },
          ]}
        >
          <TemperatureFrame
            style={{
              borderRadius: 0,
              paddingHorizontal: 20,
              paddingVertical: 12,
            }}
          >
            <TemperatureLabel style={{ fontSize: 18, fontWeight: '600' }} />
          </TemperatureFrame>
        </TemperatureProvider>
      </Section>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 80,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  sectionContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
  },
});
