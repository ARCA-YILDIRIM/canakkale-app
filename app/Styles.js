import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
    primary: '#3B82F6',
    background: '#FFFFFF',
    text: '#333333',
    placeholder: '#999999',
    border: '#D1D5DB',
    label: '#555',
    button: '#344054'
};

export const SIZES = {
    width,
    height,
    base: 10,
    font: 16,
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
    },
    smallBody: {
        fontSize: 14,
    }
};

export const commonStyles = {
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerRegister: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: SIZES.padding
    },
    tabHeader: {
        paddingTop: SIZES.padding,
        marginBottom: SIZES.padding * 2
    },
    tabHeaderLogin: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    marginTop: {
        marginTop: SIZES.base
    },
    progressBar: {
        height: 10,
        backgroundColor: "#D0D5DD",
        borderRadius: 9999,
        overflow: 'hidden'
    },
    progressIndicator25: {
        height: '100%',
        width: '25%',
        backgroundColor: COLORS.primary
    },
    progressIndicator50: {
        height: '100%',
        width: '50%',
        backgroundColor: COLORS.primary
    },
    progressIndicator75: {
        height: '100%',
        width: '75%',
        backgroundColor: COLORS.primary
    },
    inputContainer: {
        marginBottom: SIZES.padding * 2
    },
    labelText: {
        marginBottom: SIZES.base,
        color: COLORS.label,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base * 1.2,
        paddingVertical: SIZES.base * 0.8,
        marginBottom: SIZES.base * 1.5,
    },
    input: {
        flex: 1,
        marginLeft: SIZES.base,
        fontSize: SIZES.font,
        color: COLORS.text,
    },
    button: {
        backgroundColor: COLORS.button,
        borderRadius: SIZES.radius,
        paddingVertical: SIZES.base * 1.5,
        alignItems: 'center',
        marginBottom: SIZES.base * 1.5,
    },
    buttonText: {
        color: COLORS.background,
        fontSize: SIZES.font,
        fontWeight: '600'
    },
    activeButton: {
        backgroundColor: COLORS.button,
    },
    inactiveButton: {
        backgroundColor: COLORS.border,
    },
    alignRight: {
        alignSelf: 'flex-end'
    },
};