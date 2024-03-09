import _ from 'lodash'

export const returnPaginationRange = (pageCount, page, limit, siblings) => {
    let pageCountPageNoInArray = 11 + siblings;
    if (pageCountPageNoInArray >= pageCount) {
        return _.range(1, pageCount + 1);
    }

    let leftSiblingsIndex = Math.max(page - siblings, 1);
    let rightSiblingsIndex = Math.min(page + siblings, pageCount);

    let showLeftDots = leftSiblingsIndex > 2;
    let showRightDots = rightSiblingsIndex < pageCount - 2;

    if (!showLeftDots && showRightDots) {
        let leftItemsCount = 3 + 2 * siblings;
        let leftRange = _.range(1, leftItemsCount + 1);
        return [...leftRange, " ...", pageCount];
    } else if (showLeftDots && !showRightDots) {
        let rightItemsCount = 3 + 2 * siblings;
        let rightRange = _.range(pageCount - rightItemsCount + 1, pageCount + 1);
        return [1, "... ", ...rightRange];
    } else {
        let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
        return [1, "... ", ...middleRange, " ...", pageCount];
    }

}

