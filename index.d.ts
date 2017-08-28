import { ViewStyle } from 'react-native';
import * as React from "react";

declare module "react-native-swiper" {
    export interface SwiperProps {
        style?: ViewStyle;
        showsButtons?: boolean;
        horizontal?: boolean;
        pagingEnabled?: boolean;
        showsHorizontalScrollIndicator?: boolean;
        showsVerticalScrollIndicator?: boolean;
        bounces?: boolean;
        scrollsToTop?: boolean;
        removeClippedSubviews?: boolean;
        automaticallyAdjustContentInsets?: boolean;
        showsPagination?: boolean;
        loadMinimal?: boolean;
        loadMinimalSize?: boolean;
        loadMinimalLoader?: boolean;
        loop?: boolean;
        autoplay?: boolean;
        autoplayTimeout?: boolean;
        autoplayDirection?: boolean;
        index?: number;
        renderPagination?: (index: number, total: number, swiper: Swiper) => JSX.Element;
        dotStyle?: ViewStyle;
        activeDotStyle?: ViewStyle;
        paginationStyle?: ViewStyle;
        dotColor?: string;
        activeDotColor?: string;
    }
    export default class Swiper extends React.Component<SwiperProps, any>{}
}
