import { Box, Text } from '@skynexui/components';
import appConfig from '../../config.json';

export function Loading({ message = 'Loading...' }) {
  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Box
        styleSheet={{
          width: '50px',
          height: '50px',
          border: `4px solid ${appConfig.theme.colors.neutrals[700]}`,
          borderTop: `4px solid ${appConfig.theme.colors.primary[400]}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <Text
        styleSheet={{
          color: appConfig.theme.colors.neutrals[200],
          fontSize: '16px',
        }}
      >
        {message}
      </Text>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <Box
      styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: appConfig.theme.colors.neutrals[800],
        borderRadius: '8px',
        gap: '8px',
        border: `2px solid ${appConfig.theme.colors.primary[500]}`,
      }}
    >
      <Text
        styleSheet={{
          color: appConfig.theme.colors.primary[500],
          fontSize: '14px',
          textAlign: 'center',
        }}
      >
        ⚠️ {message}
      </Text>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '8px 16px',
            backgroundColor: appConfig.theme.colors.primary[400],
            color: appConfig.theme.colors.neutrals['000'],
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Try again
        </button>
      )}
    </Box>
  );
}
