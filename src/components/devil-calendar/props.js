export default () => ({
    calnum:{
        type: Number,
        default: 6
    },
    singleSelect:{
        type:Boolean,
        default:false
    },
    startDate:{
        type: String,
        default: ''
    },
    dateRangeMode:{
        type:Boolean,
        default:false
    },
    calendarDateRange:{
        type: Array,
        default () {
            return []
        }
    },
    outerdata:{
        type: Object,
        default () {
            return {}
        }
    },
    showfestival:{
        type:Boolean,
        default:false
    },
    onlyshowfestival:{
        type:Boolean,
        default:false
    },
    checkedDates: {
        type: Array, // [2018-08-01,2018-09-12]
        default () {
            return []
        }
    },
    afterCellClickfunc:{
        type: Function,
        default: function() {}
    },
    customslotfunc:{
        type: Function,
        default: function(ob,dk){
            let inclass = ''
            if(dk==0 || dk==6){
                inclass = 'weekendspan'
            }
            if(ob.usefestival){
                inclass += ' onlyfestival'
            }
            return '<span class="'+inclass+'">'+ ob.num +'</span>' +'<b class="price">'+(ob.festval?ob.festval:'')+'</b>'
        }
    },
    afterselectedfunc:{
        type: Function,
        default: function(){}
    }
})
