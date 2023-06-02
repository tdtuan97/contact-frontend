import moment from 'moment';
import {saveAs} from 'file-saver';
import * as CONSTANTS from './constants'
import {pushMessageError} from "@layouts";

const helpers = {
    getEndPointAPI: function () {
        return process.env.REACT_APP_API_ENDPOINT
    },

    getBase64: function (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result);

            reader.onerror = (error) => reject(error);
        })
    },

    download: function (url, filename) {
        console.log(`URL: ${url}`)
        fetch(url, {
            //mode       : 'no-cors',
            mode   : 'cors',
            headers: {
                'Access-Control-Allow-Origin': "*"
            }
        }).then(function (response) {
            return response.blob().then((b) => {
                    saveAs(b, filename)
                }
            );
        }).catch(error => {
            pushMessageError(`Can't download file ${filename}`);
            console.log(error.message)
        });
    },


    formatCash: function (value, currency = 'VNĐ') {
        value = value.toString();
        return value.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        }) + ' ' + currency
    },

    getNow: function (format = 'HH:mm:ss') {
        return moment().format(format);
    },

    redirectForce: function (url, isBlank = false) {
        isBlank ? window.open(url, '_blank') : window.open(url)
    },

    trimChar: function (string, charToRemove) {
        while (string.charAt(0) === charToRemove) {
            string = string.substring(1);
        }

        while (string.charAt(string.length - 1) === charToRemove) {
            string = string.substring(0, string.length - 1);
        }

        return string;
    },

    getSiteIdByPlantId: function (plantId, sites) {
        let siteId = null;
        if (sites.length > 0) {
            sites.forEach(site => {
                let plantFind = site.plants.find(plant => plant.id === plantId)
                if (plantFind) {
                    siteId = site.id
                    return siteId;
                }
            })
        }

        return siteId
    },

    /*findScopeByRoute: function (searchData, siteId = null, plantId = null) {
        let portfolioIdFind = null;
        let siteIdFind = null;
        let plantIdFind = null;

        let portfolioList = searchData.portfolioList ?? []
        try {
            switch (true) {
                case true:
                    if (plantId) {
                        portfolioList.forEach(portfolio => {
                            const sites = portfolio.sites ?? [];
                            sites.forEach(site => {
                                const plants = site.plants ?? [];

                                plants.forEach(plant => {
                                    if (plantId === plant.id) {
                                        // Set plant
                                        plantIdFind = plant.id;
                                        // Set site
                                        siteIdFind = site.id;
                                        // Set portfolio
                                        portfolioIdFind = portfolio.id
                                        return false;
                                    }
                                })
                            })
                        })

                        break
                    }

                    if (siteId) {
                        portfolioList.forEach(portfolio => {
                            const sites = portfolio.sites ?? [];
                            sites.forEach(site => {
                                if (siteId === site.id) {
                                    // Set site
                                    siteIdFind = site.id;
                                    // Set portfolio
                                    portfolioIdFind = portfolio.id
                                    return false;
                                }
                            })
                        })
                        break
                    }

                    break;
            }
        } catch (e) {
            //
        }

        return {
            "portfolioIdFind": portfolioIdFind,
            "siteIdFind": siteIdFind,
            "plantIdFind": plantIdFind,
        }
    },*/

    /**
     * Get current scope data label
     **/
    getCurrentScopeDataLabel(layoutReducer) {
        let {searchData} = layoutReducer
        let listScope    = [searchData.siteNameSelected];
        if (searchData.plantNameSelected) {
            listScope.push(searchData.plantNameSelected)
        }

        return listScope.length > 0 ? listScope.join(', ') : '';
    },

    /**
     * Get current scope siteId
     **/
    getCurrentScopeSiteId: function (layoutReducer) {
        let {searchData} = layoutReducer
        return searchData.siteIdSelected
    },

    /**
     * Get current scope plantId
     **/
    getCurrentScopePlantId: function (layoutReducer) {
        let {searchData} = layoutReducer
        return searchData.plantIdSelected
    },

    /**
     * Get random color
     **/
    getRandomColor: function () {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },

    /**
     * Calc percentage
     * @param partialValue
     * @param totalValue
     * @param fixNumber
     * @returns {number}
     */
    percentage: function (partialValue, totalValue, fixNumber = 0) {
        let result = (100 * partialValue) / totalValue;
        if (fixNumber > 0) {
            result = result.toFixed(fixNumber);
        }
        return result;
    },

    /**
     * Get time range by filter time
     **/
    getTimeRangeByFilterTime: function (config) {
        let from    = moment()
        let to      = moment();
        let groupBy = "hours"

        switch (config) {
            case CONSTANTS.FILTER_LAST_24_HOUR:
                from    = moment().subtract(24, "hour");
                to      = moment();
                groupBy = CONSTANTS.GROUP_BY_HOUR
                break
            case CONSTANTS.FILTER_TODAY:
                from    = moment().startOf('day');
                to      = moment();
                groupBy = CONSTANTS.GROUP_BY_HOUR
                break
            case CONSTANTS.FILTER_YESTERDAY:
                from    = moment().subtract(1, "day").startOf("day");
                to      = moment().subtract(1, "day").endOf("day");
                groupBy = CONSTANTS.GROUP_BY_HOUR
                break
            case CONSTANTS.FILTER_LAST_7_DAYS:
                from    = moment().subtract(7, "day");
                to      = moment();
                groupBy = CONSTANTS.GROUP_BY_DATE
                break
            case CONSTANTS.FILTER_THIS_WEEK:
                from    = moment().startOf('week');
                to      = moment();
                groupBy = CONSTANTS.GROUP_BY_DATE
                break
            case CONSTANTS.FILTER_LAST_30_DAYS:
                from    = moment().subtract(30, "day");
                to      = moment();
                groupBy = CONSTANTS.GROUP_BY_DATE
                break
            case CONSTANTS.FILTER_THIS_MONTH:
                from    = moment().startOf('month');
                to      = moment();
                groupBy = CONSTANTS.GROUP_BY_DATE
                break
            case CONSTANTS.FILTER_LAST_6_MONTHS:
                from    = moment().subtract(6, "month");
                to      = moment();
                groupBy = CONSTANTS.GROUP_BY_MONTH
                break
            case CONSTANTS.FILTER_LAST_12_MONTHS:
                from    = moment().subtract(12, "month");
                to      = moment();
                groupBy = CONSTANTS.GROUP_BY_MONTH
                break
            case CONSTANTS.FILTER_THIS_YEAR:
                from    = moment().startOf('year');
                to      = moment();
                groupBy = CONSTANTS.GROUP_BY_MONTH
                break
            default:
                break;
        }
        return {
            "groupBy"   : groupBy,
            "from"      : from,
            "to"        : to,
            "fromString": from.format(CONSTANTS.DEFAULT_FORMAT_DATETIME),
            "toString"  : to.format(CONSTANTS.DEFAULT_FORMAT_DATETIME),
        }
    },

    getTimeRangeByYear: function (year = null) {
        year     = year ?? moment().year;
        let from = moment().year(year).startOf('year');
        let to   = moment().year(year);

        return {
            "fromString": from.format(CONSTANTS.DEFAULT_FORMAT_DATETIME),
            "toString"  : to.format(CONSTANTS.DEFAULT_FORMAT_DATETIME),
        }
    },

    timestampFormat: function (timestamp, format = CONSTANTS.DEFAULT_FORMAT_DATETIME) {
        let object = moment(timestamp)
        return object.format(format);
    },

    cToF: function (celsius) {
        return celsius * 9 / 5 + 32;
    },

    fToC: function (fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    },

    hashCode: function (str) { // java String#hashCode
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return 100 * hash;
    },

    intToRGB: function (i) {
        let c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        return "#" + "00000".substring(0, 6 - c.length) + c;
    },

    stringToColor: function (str) {
        return this.intToRGB(this.hashCode(str));
    }

}
export default helpers;
