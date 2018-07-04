

describe("Quality", function() {

  function generateQualityFromInitialData(name, sellIn, quality) {
    const gildedRose = new Shop([ new Item(name, sellIn, quality) ]);
    const items = gildedRose.updateQuality();
    return items[0].quality;
  }
/*
  it("name doesn't change", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it("default items update sellIn correctly", function() {
    const gildedRose = new Shop([ new Item("foo", 1, 5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(0);
  });
*/

  describe("default items", function(){

    it("default items update quality correctly before sellIn", function() {
      expect(generateQualityFromInitialData("foo", 2, 5)).toEqual(4);
    });

    it("default items update quality correctly past sellIn", function() {
      expect(generateQualityFromInitialData("foo", 0, 5)).toEqual(3);
    });

    it("default items' quality cannot decrease below 0", function() {
      expect(generateQualityFromInitialData("foo", 0, 0)).toEqual(0);
    });

  })

  describe("Aged brie", function(){

    it("Aged brie updates quality correctly", function() {
      expect(generateQualityFromInitialData("Aged Brie", -1, 5)).toEqual(7);
    });

    it("Aged brie's quality cannot exceed 50", function() {
      expect(generateQualityFromInitialData("Aged Brie", 0, 50)).toEqual(50);
    });

  })

  describe("Backstage pass", function(){

    it("Backstage pass updates quality correctly when sellIn > 10", function() {
      expect(generateQualityFromInitialData('Backstage passes to a TAFKAL80ETC concert', 12, 5)).toEqual(6);
    });

    it("Backstage pass updates quality correctly when 5 < sellIn < 10", function() {
      expect(generateQualityFromInitialData('Backstage passes to a TAFKAL80ETC concert', 7, 5)).toEqual(7);
    });

    it("Backstage pass updates quality correctly when sellIn <= 5", function() {
      expect(generateQualityFromInitialData('Backstage passes to a TAFKAL80ETC concert', 3, 5)).toEqual(8);
    });

    it("Backstage pass updates quality correctly past sellIn", function() {
      expect(generateQualityFromInitialData('Backstage passes to a TAFKAL80ETC concert', 0, 5)).toEqual(0);
    });

    it("Backstage pass's quality cannot exceed 50'", function() {
      expect(generateQualityFromInitialData('Backstage passes to a TAFKAL80ETC concert', 3, 50)).toEqual(50);
    });

  })

  describe("Sulfuras", function(){

    it("Quality of Sulfuras doesn't change", function() {
      expect(generateQualityFromInitialData('Sulfuras, Hand of Ragnaros', undefined, 10)).toEqual(10);
    });

  })

  describe("Conjured item", function(){

    it("Quality of conjured item decreases twice as fast before sellIn", function() {
      expect(generateQualityFromInitialData('Conjured Item', 5, 10)).toEqual(8);
    });

    it("Quality of conjured item decreases twice as fast after sellIn", function() {
      expect(generateQualityFromInitialData('Conjured Item', 0, 10)).toEqual(6);
    });

    it("Quality of conjured item cannot go below 0", function() {
      expect(generateQualityFromInitialData('Conjured Item', 5, 0)).toEqual(0);
    });

    it("Quality of conjured aged brie updates correctly", function() {
      expect(generateQualityFromInitialData('Conjured Aged Brie', 5, 10)).toEqual(12);
    });

  })

});
