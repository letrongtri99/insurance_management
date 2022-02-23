import SortUtils from './SortUtils';
// import SortUtils from 'app/shared/helper/SortUtils';
export default class FinalPrice {
  private static calculateFinalPriceFromBaseSpecialAndTier = (
    qty: number,
    basePrice: any,
    specialPrice: any,
    tierPriceSort: any
  ): number => {
    /**
     * Final Price with BasePrice + SpecialPrice + TierPrice
     * Loop TierPrice
     * 1. Qty Product with Tier > Qty Input
     * 2. Qty[i] Product with Tier < Qty input && Qty Input < Qty[i + 1] Product with Tier
     * 3. Qty Input >= Qty Qty Product with Tier ended
     */
    let finalPrice = 0;
    // console.log('RUNNNN_1111_QTY:', qty, ', basePrice:', basePrice, ' , specialPrice : ', specialPrice, ' , tierPrice :', tierPriceSort);
    for (let i = 0; i < tierPriceSort.length; i += 1) {
      // console.log('RUNNNNNNNNNNN_1:::', tierPriceSort[i]._qty);
      if (tierPriceSort[i]._qty > qty) {
        finalPrice = parseFloat(specialPrice._price);
        // console.log('FINAL_1:::', finalPrice);
        break;
      } else if (
        i < tierPriceSort.length - 1 &&
        tierPriceSort[i]._qty <= qty &&
        qty < tierPriceSort[i + 1]._qty
      ) {
        finalPrice = tierPriceSort[i]._value;
        // console.log('FINAL_2:::', finalPrice);
        break;
      } else if (qty >= tierPriceSort[tierPriceSort.length - 1]._qty) {
        finalPrice = tierPriceSort[tierPriceSort.length - 1]._value;
        // console.log('FINAL_3:::', finalPrice);
        break;
      }
    }
    return finalPrice;
  };

  private static calculateFinalPriceFromBaseAndSpecial = (
    qty: number,
    basePrice: any,
    specialPrice: any
  ): number => {
    let finalPrice = 0;
    /**
     * Final Price with BasePrice + SpecialPrice
     * 1. Special Price with fromDate & endDate
     * + saleFrom > today & saleEnd < today ===> finalPrice = basePrice
     * + saleFrom < today & saleEnd > today ===> finalPrice = specialPrice
     * 2. Special Price only fromDate
     * + saleFrom < today ===> finalPrice = basePrice
     * + saleFrom > today ===> finalPrice = specialPrice
     */
    // console.log('RUNNNN_2222_QTY:', qty, ', basePrice:', basePrice, ' , specialPrice : ', specialPrice);
    const today = new Date().getTime();
    if (
      specialPrice._price &&
      specialPrice._fromDate &&
      specialPrice._endDate
    ) {
      const saleFrom = new Date(specialPrice._fromDate).getTime();
      const saleEnd = new Date(specialPrice._endDate).getTime();
      if (
        (saleFrom > today && saleEnd > today) ||
        (saleFrom < today && saleEnd < today)
      ) {
        finalPrice = basePrice;
      } else if (saleFrom < today && saleEnd > today) {
        finalPrice = parseFloat(specialPrice._price);
      }
    } else if (specialPrice._price && specialPrice._fromDate) {
      const sale = new Date(specialPrice._fromDate).getTime();
      if (sale < today) {
        finalPrice = basePrice;
      } else {
        finalPrice = parseFloat(specialPrice._price);
      }
    }
    return finalPrice;
  };

  private static calculateFinalPriceFromBaseAndTier = (
    qty: number,
    basePrice: any,
    tierPriceSort: any
  ): number => {
    /**
     * Final Price with BasePrice + TierPrice
     * 1. Exist tierPrice
     * + Qty Product with Tier > Qty Input ===> finalPrice = basePrice
     * + Qty [i]Product with Tier < Qty Input & Qty Input < Qty [i+1]Product with Tier ===> finalPrice = tierPrice
     * + Qty Input >= Qty Product with Tier Ended ===> finalPrice = tierPrice Ended
     * 2. Exist basePrice
     * + ===> finalPrice = basePrice;
     */
    let finalPrice = 0;
    // console.log('RUNNNN_3333_QTY:', qty, ', basePrice:', basePrice, ' , tierPrice :', tierPriceSort);
    for (let i = 0; i < tierPriceSort.length; i += 1) {
      if (tierPriceSort[i]._qty > qty) {
        finalPrice = parseFloat(basePrice);
        break;
      } else if (
        i < tierPriceSort.length - 1 &&
        tierPriceSort[i]._qty <= qty &&
        qty < tierPriceSort[i + 1]._qty
      ) {
        finalPrice = tierPriceSort[i]._value;
        break;
      } else if (qty >= tierPriceSort[tierPriceSort.length - 1]._qty) {
        finalPrice = tierPriceSort[tierPriceSort.length - 1]._value;
        break;
      }
    }
    return finalPrice;
  };

  public static calculateFinalPrice = (
    qty: number,
    basePrice: number,
    specialPrice?: { _price: number },
    tierPrice?: []
  ): number => {
    let finalPrices = 0;
    // console.log('QTY:', qty, ', basePrice:', basePrice, ' , specialPrice : ', specialPrice, ' , tierPrice :', tierPrice);
    const tierPriceSort: Array<any> = [];
    tierPriceSort.push(SortUtils.SortAscendingQty(tierPrice));

    if (
      qty &&
      basePrice &&
      specialPrice &&
      specialPrice._price !== null &&
      tierPrice &&
      tierPrice instanceof Array
    ) {
      finalPrices = FinalPrice.calculateFinalPriceFromBaseSpecialAndTier(
        qty,
        basePrice,
        specialPrice,
        tierPriceSort[0]
      );
    } else if (
      qty &&
      basePrice &&
      specialPrice &&
      specialPrice._price !== null
    ) {
      finalPrices = FinalPrice.calculateFinalPriceFromBaseAndSpecial(
        qty,
        basePrice,
        specialPrice
      );
    } else if (qty && basePrice && tierPrice && tierPrice instanceof Array) {
      finalPrices = FinalPrice.calculateFinalPriceFromBaseAndTier(
        qty,
        basePrice,
        tierPriceSort[0]
      );
    } else if (qty && basePrice) {
      finalPrices = basePrice;
    }
    return finalPrices;
  };
}
