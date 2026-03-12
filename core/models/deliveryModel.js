// minimal delivery model for testing deliveryReport

class DeliveryModel {
    constructor({
                    expectedMinutes,
                    actualMinutes,
                    driver,
                    date
                }) {
        this.expectedMinutes = expectedMinutes;   // number
        this.actualMinutes = actualMinutes;       // number
        this.driver = driver;                     // string
        this.date = date;                         // Date or string
    }
}

export default DeliveryModel;