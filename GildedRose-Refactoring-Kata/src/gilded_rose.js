class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.MAX_QUALITY = 50;
    this.MIN_QUALITY = 0;
  }
  updateQuality(){
    for (var i = 0; i < this.items.length; i++){
      this.updateItem(this.items[i]);
    }
    return this.items
  }

  updateItem(item) {
    let flags = {
      isConjured: item.name.includes("Conjured"),
      isSulfuras: item.name === "Sulfuras, Hand of Ragnaros",
      isBackstagePass: item.name.includes("Backstage pass"),
      isAgedBrie: item.name.includes("Aged Brie")
    }

    if(flags.isSulfuras){
      return;
    }

    item.sellIn -= 1;
    this.updateItemQuality(item,flags);
  }

  updateItemQuality(item, flags){
    let amount = this.calculateDefaultDepreciation(item.sellIn);
    
    if(flags.isAgedBrie){
      amount = -amount;
    }

    if(flags.isBackstagePass){
      amount = this.calculateBackstagePassDepreciation(item.sellIn);
    }

    item.quality = this.calculateNewQuality(item.quality, amount, flags.isConjured);
  }

  calculateDefaultDepreciation(sellIn) {
    return sellIn >= 0 ? -1 : -2;
  }

  calculateBackstagePassDepreciation(sellIn) {
    let amount;
    if(sellIn < 0){
      //makes quality 0
      amount = -this.MAX_QUALITY;
    } else if(sellIn <= 5){
      amount = 3;
    } else if(sellIn <= 10){
      amount = 2;
    } else {
      amount = 1;
    }

    return amount;
  }

  calculateNewQuality(quality,amount,isConjured){
    let multiplier = isConjured ? 2 : 1;
    return Math.max(this.MIN_QUALITY, Math.min(this.MAX_QUALITY, quality + multiplier*amount));
  }
}
