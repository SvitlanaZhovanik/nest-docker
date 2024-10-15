import { SortOrder } from 'mongoose';
import { SORT_BY } from './article.constants';

export const sortByOptions = (value: SORT_BY): Record<string, SortOrder> => {
    switch (value) {
        case SORT_BY.DECREASE_TITLE:
            return { title: -1 };
        case SORT_BY.INCREASE_TITLE:
            return { title: +1 };
        case SORT_BY.INCREASE_DATE:
            return { pubDate: +1 };
        default:
            return { pubDate: -1 };
    }
};
