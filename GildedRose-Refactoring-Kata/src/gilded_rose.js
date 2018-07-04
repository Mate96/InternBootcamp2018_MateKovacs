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
    this.rules = this.getRules();
  }

  getRules() {
    return {
      "default": item => {
        item.sellIn = item.sellIn - 1;
        item.quality = item.sellIn < 0 ? Math.max(0, item.quality - 2): Math.max(0, item.quality - 1);
      },
      "Aged Brie": item => {
        item.sellIn = item.sellIn - 1;
        item.quality = item.sellIn < 0 ? Math.min(50, item.quality + 2): Math.min(50, item.quality + 1);
      },
      "Backstage passes to a TAFKAL80ETC concert": item => {
        item.sellIn = item.sellIn - 1;
        if(item.sellIn < 0) {
          item.quality = 0;
        } else if(item.sellIn <= 5) {
          item.quality = Math.min(50, item.quality + 3);
        } else if(item.sellIn <= 10) {
          item.quality = Math.min(50, item.quality + 2);
        } else {
          item.quality = Math.min(50, item.quality + 1);
        }
      },
      "Sulfuras, Hand of Ragnaros": item => {}
    };
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      let defaultKey = "default";
      if(!!this.rules[item.name]) {
        this.rules[item.name](item);
      } else {
        this.rules[defaultKey](item);
      }
    }

    return this.items;
  }
}
