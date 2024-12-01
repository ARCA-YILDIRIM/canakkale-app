import PropTypes from 'prop-types';

function PageHeader({ title, onBack = () => { }, progress = 0.25 }) {
    return (
        <View style={commonStyles.tabHeader}>
            <TouchableOpacity onPress={onBack}>
                <Icons name="arrowleft" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <View>
                <View style={commonStyles.progressContainer}>
                    <View style={commonStyles.progressBar}>
                        <View
                            style={[
                                commonStyles.progressIndicator,
                                { width: `${progress * 100}%` }
                            ]}
                        />
                    </View>
                </View>
                <Text
                    style={[FONTS.h2, { color: COLORS.text }]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {title}
                </Text>
            </View>
        </View>
    );
}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired, // Başlık zorunlu ve string olmalı
    onBack: PropTypes.func.isRequired, // Geri butonu fonksiyonu zorunlu
    progress: PropTypes.number, // İlerleme oranı opsiyonel (0-1 arasında olmalı)
};
