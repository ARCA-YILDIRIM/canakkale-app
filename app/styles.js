import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
    primary: '#3B82F6',
    background: '#FFFFFF',
    text: '#333333',
    placeholder: '#999999',
    border: '#D1D5DB'
};

export const SIZES = {
    width,
    height,
    base: 10,
    font: 14,
    radius: 12,
    padding: 16
};

export const FONTS = {
    h1: {
        fontSize: 36,
        fontWeight: '700',
        letterSpacing: 2
    },
    h2: {
        fontSize: 24,
        fontWeight: '600'
    },
    body: {
        fontSize: 16,
        fontWeight: '400'
    }
};

export const commonStyles = {
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: SIZES.padding
    },
    tabHeader: {
        paddingTop: SIZES.padding,
        marginBottom: SIZES.padding * 2
    },
    progressContainer: {
        marginTop: SIZES.base
    },
    progressBar: {
        height: 10,
        backgroundColor: "#D0D5DD",
        borderRadius: 9999,
        overflow: 'hidden'
    },
    progressIndicator: {
        height: '100%',
        width: '25%',
        backgroundColor: COLORS.primary
    },
    inputContainer: {
        marginBottom: SIZES.padding * 2
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
        paddingVertical: SIZES.base / 2
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        paddingVertical: SIZES.base * 1.5,
        alignItems: 'center',
        marginTop: SIZES.padding
    },
    buttonText: {
        color: COLORS.background,
        fontSize: SIZES.font,
        fontWeight: '600'
    }
};