import Vue from 'vue'
import Router from 'vue-router'
import Load from '@/pages/load'
import Home from '@/pages/home';
import Order from '@/pages/entrust/order';
import OrderDetail from '@/pages/entrust/orderDetail';
import NewOrder from '@/pages/entrust/newOrder';
import Fleet from '@/pages/dispatch/fleet';
import Scheduling from '@/pages/dispatch/scheduling';
import Transportation from '@/pages/dispatch/transportation';
import Maintenance from '@/pages/dispatch/maintenance';
import Abnormal from '@/pages/dispatch/abnormal';
import Delay from '@/pages/dispatch/delay';
import ReceivableCost from '@/pages/settlement/receivableCost';
import ReceivableAccount from '@/pages/settlement/receivableAccount';
import InvoicManagement from '@/pages/settlement/invoiceManagement';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Load',
            component: Load
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/entrust/order',
            name: 'Order',
            component: Order
        },
        {
            path: '/entrust/order/orderdetail',
            name: 'OrderDetail',
            component: OrderDetail
        },
        {
            path: '/entrust/order/newOrder',
            name: 'NewOrder',
            component: NewOrder
        },
        {
            path: '/dispatch/fleet',
            name: 'Fleet',
            component: Fleet
        }, {
            path: '/dispatch/transportation',
            name: 'Transportation',
            component: Transportation
        }, {
            path: '/dispatch/scheduling',
            name: 'Scheduling',
            component: Scheduling
        }, {
            path: '/dispatch/maintenance',
            name: 'Maintenance',
            component: Maintenance
        }, {
            path: '/dispatch/abnormal',
            name: 'Abnormal',
            component: Abnormal
        }, {
            path: '/dispatch/delay',
            name: 'Delay',
            component: Delay
        },{
            path: '/settlement/receivableCost',
            name: 'ReceivableCost',
            component: ReceivableCost
        },{
            path: '/settlement/receivableAccount',
            name: 'ReceivableAccount',
            component: ReceivableAccount
        },
        {
            path: '/settlement/invoicManagement',
            name: 'InvoicManagement',
            component: InvoicManagement
        }
    ]
})