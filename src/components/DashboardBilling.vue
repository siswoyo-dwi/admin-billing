<template>
	<div class="layout-dashboard">
		<div class="grid">
			<div class="col-12 md:col-12">
				<div class="card widget-visitor-graph">
					<div class="card-header">
						<span>Billing graph</span>
						<Dropdown :options="visitorYear" v-model="selectedVisitorYear" optionLabel="name" @change="changeVisitorChart"></Dropdown>
					</div>

				

					<div class="graph">
						<h6>Revenue</h6>
						<Chart ref="visitor" type="bar" :data="visitorChart" :options="visitorChartOptions" id="visitor-chart"></Chart>
					</div>
				</div>
			</div>

			<div class="col-12 md:col-12">
				<div class="card widget-revenue-graph">
					<div class="card-header">
						<span>Monthly revenue</span>
						<Dropdown :options="revenueMonth" v-model="selectedRevenueMonth" optionLabel="name" @change="changeRevenueChart($event)"></Dropdown>
					</div>

					<div class="graph">
						<Chart ref="revenue" type="line" id="revenue-chart" :data="revenueChart" :options="revenueChartOptions"></Chart>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CustomerService from '../service/CustomerService';
export default {
	data() {
		return {
			customersTable: null,
			customersTable1: null,
			customersTable2: null,
			selectedVisitorYear: null,
			selectedRevenueMonth: null,
			selectedOrderYear: null,
			selectedCustomers1: null,
			selectedCustomerYear: null,
			carouselResponsiveOptions: [
				{
					breakpoint: '1024px',
					numVisible: 3,
					numScroll: 3
				},
				{
					breakpoint: '768px',
					numVisible: 2,
					numScroll: 2
				},
				{
					breakpoint: '560px',
					numVisible: 1,
					numScroll: 1
				}
			],
			visitorChart: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
				datasets: [
					{
						label: 'Plan',
						data: [630, 630, 695, 695, 695, 760, 760, 760, 840, 840, 840, 840],
						borderColor: [
							'#FC6161',
						],
						pointBorderColor: 'transparent',
						pointBackgroundColor: 'transparent',
						type: 'line',
						fill: false,
						barPercentage: 0.5,
						stepped: true
					},
					{
						label: 'Growth actual',
						data: [600, 671, 660, 665, 700, 610, 810, 790, 710, 860, 810, 780],
						backgroundColor: getComputedStyle(document.body).getPropertyValue('--primary-color') ,
						fill: true,
						barPercentage: 0.5
					}
				]
			},
			visitorChartOptions: {
				plugins: {
					legend: {
						position: 'top',
						align: 'end'
					}
				},
				responsive: true,
				hover: {
					mode: 'index'
				},
				scales: {
					y: {
						min: 0,
						max: 10000000,
						grid: {
							display: false
						}
					},
					x: {
						grid: {
							display: false
						}
					}
				}
			},
			growth:'$620,076',
			avgCustomer: '$1,120',
			timelineEvents: [
				{transaction: 'Payment from #28492', amount: '+$250.00', date: 'June 13, 2020 11:09 AM',
					icon: 'pi pi-check', iconColor: '#0F8BFD', amountColor: '#00D0DE'},
				{transaction: 'Process refund to #94830', amount: '-$570.00', date: 'June 13, 2020 08:22 AM',
					icon: 'pi pi-refresh', iconColor: '#FC6161', amountColor: '#FC6161'},
				{transaction: 'New 8 user to #5849', amount: '+$50.00', date: 'June 12, 2020 02:56 PM',
					icon: 'pi pi-plus', iconColor: '#0BD18A', amountColor: '#0BD18A'},
				{transaction: 'Payment from #3382', amount: '+$3830.00', date: 'June 11, 2020 06:11 AM',
					icon: 'pi pi-check', iconColor: '#0F8BFD', amountColor: '#00D0DE'},
				{transaction: 'Payment from #4738', amount: '+$845.00', date: 'June 11, 2020 03:50 AM',
					icon: 'pi pi-check', iconColor: '#0F8BFD', amountColor: '#00D0DE'},
				{transaction: 'Payment failed form #60958', amount: '$1450.00', date: 'June 10, 2020 07:54 PM',
					icon: 'pi pi-exclamation-triangle', iconColor: '#EC4DBC', amountColor: '#EC4DBC'},
				{transaction: 'Payment from #5748', amount: '+$50.00', date: 'June 09, 2020 11:37 PM',
					icon: 'pi pi-check', iconColor: '#0F8BFD', amountColor: '#00D0DE'},
				{transaction: 'Removed 32 users from #5849', amount: '-$240.00', date: 'June 09, 2020 08:40 PM',
					icon: 'pi pi-minus', iconColor: '#FC6161', amountColor: '#FC6161'},
			],
			countryChart: {
				labels: ['RUS', 'Other', 'IND', 'AUS', 'JPN', 'USA', 'CHN'],
				datasets: [
					{
						data: [30, 18, 36, 54, 61, 90, 72],
						backgroundColor: [
							'#0F8BFD',
							'#545C6B',
							'#EC4DBC',
							'#EEE500',
							'#FC6161',
							'#00D0DE',
							'#873EFE',
						],
						hoverBackgroundColor: [
							'#0F8BFD',
							'#545C6B',
							'#EC4DBC',
							'#EEE500',
							'#FC6161',
							'#00D0DE',
							'#873EFE',
						],
						borderColor: 'transparent',
						fill: true
					}
				]
			},
			countryChartOptions: {
				responsive: true
			},
			revenueChart: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'Sales',
						data: [37, 34, 21, 27, 10, 18, 15],
						borderColor: '#EEE500',
						pointBackgroundColor: '#EEE500',
						backgroundColor: 'rgba(238, 229, 0, 0.05)',
						fill: true,
						tension: 0.4
					},
					{
						label: 'Revenue',
						data: [31, 27, 30, 37, 23, 29, 20],
						borderColor: '#00D0DE',
						pointBackgroundColor: '#00D0DE',
						backgroundColor: 'rgba(0, 208, 222, 0.05)',
						fill: true,
						tension: 0.4
					},
					{
						label: 'Expenses',
						data: [21, 7, 13, 3, 19, 11, 6],
						borderColor: '#FC6161',
						pointBackgroundColor: '#FC6161',
						backgroundColor: 'rgba(253, 72, 74, 0.05)',
						fill: true,
						tension: 0.4
					},
					{
						label: 'Customer',
						data: [47, 31, 35, 20, 46, 39, 25],
						borderColor: '#0F8BFD',
						pointBackgroundColor: '#0F8BFD',
						backgroundColor: 'rgba(15, 139, 253, 0.05)',
						fill: true,
						tension: 0.4
				}]
			},
			revenueChartOptions: {
				responsive: true,
				hover: {
					mode: 'index'
				},
				scales: {
					y: {
						min: 0,
						max: 50,
						ticks: {
							stepSize: 5
						}
					}
				}
			},
			customerChart: {
				labels: ['January', 'March', 'May', 'Agust', 'October', 'December'],
				datasets: [
					{
						data: [10, 25, 48, 35, 54, 70],
						backgroundColor: '#AAABDD',
						hoverBackgroundColor: '#AAABDD',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [18, 35, 23, 30, 59, 65],
						backgroundColor: '#A0A0D9',
						hoverBackgroundColor: '#A0A0D9',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [20, 47, 46, 46, 61, 70],
						backgroundColor: '#ACADDE',
						hoverBackgroundColor: '#ACADDE',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [17, 34, 18, 48, 67, 68],
						backgroundColor: '#ABABDD',
						hoverBackgroundColor: '#ABABDD',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [9, 37, 47, 50, 60, 62],
						backgroundColor: '#A2A3D9',
						hoverBackgroundColor: '#A2A3D9',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [8, 48, 40, 52, 72, 75],
						backgroundColor: '#A3A4DA',
						hoverBackgroundColor: '#A3A4DA',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [10, 18, 50, 47, 63, 80],
						backgroundColor: '#A2A3D9',
						hoverBackgroundColor: '#A2A3D9',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [20, 36, 39, 58, 59, 85],
						backgroundColor: '#8485CD',
						hoverBackgroundColor: '#8485CD',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [30, 45, 35, 50, 54, 81],
						backgroundColor: '#7D7ECA',
						hoverBackgroundColor: '#7D7ECA',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [28, 35, 52, 56, 60, 77],
						backgroundColor: '#8384CD',
						hoverBackgroundColor: '#8384CD',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [40, 40, 38, 45, 68, 86],
						backgroundColor: '#8F90D2',
						hoverBackgroundColor: '#8F90D2',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [50, 23, 27, 34, 65, 90],
						backgroundColor: '#8C8DD0',
						hoverBackgroundColor: '#8C8DD0',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [29, 27, 29, 42, 55, 84],
						backgroundColor: '#9495D4',
						hoverBackgroundColor: '#9495D4',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [10, 37, 47, 29, 59, 80],
						backgroundColor: '#9696D4',
						hoverBackgroundColor: '#9696D4',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [10, 54, 42, 38, 63, 83],
						backgroundColor: '#7273C6',
						hoverBackgroundColor: '#7273C6',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [25, 44, 50, 56, 65, 92],
						backgroundColor: '#5F60BE',
						hoverBackgroundColor: '#5F60BE',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [30, 43, 48, 45, 73, 78],
						backgroundColor: '#5C5DBD',
						hoverBackgroundColor: '#5C5DBD',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					},
					{
						data: [29, 47, 54, 60, 77, 86],
						backgroundColor: '#5C5DBD',
						hoverBackgroundColor: '#5C5DBD',
						fill: true,
						categoryPercentage: 1.0,
						barPercentage: 1.0
					}
				]
			},
			customerChartOptions: {
				interaction: {
					mode: 'x'
				},
				plugins: {
					legend: {
						display: false
					}
				},
				scales: {
					y: {
						display: false,
					},
					x: {
						grid: {
							display : false
						}
					}
				}
			},
			customerMax: '1232',
			customerMin: '284',
			customerAvg: '875',
			customerCarousel: null,
			orderYear: [
				{name: '2021', code: '0'},
				{name: '2020', code: '1'}
			],
			visitorYear: [
				{name: '2020', code: '0'},
				{name: '2019', code: '1'}
			],
			customerYear: [
				{name: '2020', code: '0'},
				{name: '2019', code: '1'}
			],
			revenueMonth: [
				{name: 'January - July 2021', code: '0'},
				{name: 'August - December 2020', code: '1'}
			]
		}
	},
	customerService: null,
	created() {

		this.customerService = new CustomerService();
	},
	mounted() {		 
		this.visitorYear = []
		for (let i = new Date().getFullYear(); i > new Date().getFullYear()-20; i--) {
			this.visitorYear.push({name: i, code:i},)
		}
		this.customerService.getCustomersLarge().then(customers => {
            this.customersTable = customers;
            this.customersTable.forEach(customer => customer.date = new Date(customer.date));
        });
        this.customerService.getCustomersLarge().then(customers => {
            this.customersTable1 = customers;
            this.customersTable1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.customerService.getCustomersMixed().then(customers => {
            this.customersTable2 = customers;
            this.customersTable2.forEach(customer => customer.date = new Date(customer.date));
        });

		this.selectedVisitorYear = this.visitorYear[0];
		this.selectedOrderYear = this.orderYear[0];
		this.selectedCustomerYear = this.customerYear[0];
		this.selectedRevenueMonth = this.revenueMonth[0];

		this.customerCarousel = [
			{user: '9,673 Users', value: '$8,362,478', image: 'nasa'},
			{user: '9,395 Users', value: '$7,927,105', image: 'beats'},
			{user: '7,813 Users', value: '$6,471,594', image: 'gopro'},
			{user: '7,613 Users', value: '$5,697,883', image: 'north'},
			{user: '98,673 Users', value: '$7,653,311', image: 'mc'},
			{user: '5,645 Users', value: '$4,567,823', image: 'dell'},
			{user: '5,153 Users', value: '$5,342,678', image: 'wwf'},
			{user: '4,338 Users', value: '$5,867,391', image: 'bmw'},
			{user: '4,170 Users', value: '$4,647,233', image: 'pepsi'},
			{user: '3,765 Users', value: '$4,123,876', image: 'netflix'},
			{user: '3,490 Users', value: '$3,688,362', image: 'deloitte'},
			{user: '2,976 Users', value: '$3,978,478', image: 'pg'},
		];
	},
	methods: {
	async	changeRevenueChart() {
			// const dataSet1 = [
			// 	[37, 34, 21, 27, 10, 18, 15],
			// 	[31, 27, 30, 37, 23, 29, 20],
			// 	[21, 7, 13, 3, 19, 11, 6],
			// 	[47, 31, 35, 20, 46, 39, 25]
			// ];
			// const dataSet2 = [
			// 	[31, 27, 30, 37, 23, 29, 20],
			// 	[47, 31, 35, 20, 46, 39, 25],
			// 	[37, 34, 21, 27, 10, 18, 15],
			// 	[21, 7, 13, 3, 19, 11, 6]
			// ];
			let vm = this
			const res = await vm.$axios.post('pendapatan/sum_pendapatan_bulanan')
			const dataSet1 = res.data.data[0]
			console.log(dataSet1);
			
			// if (event.value.code === '1') {
			// 	this.revenueChart.datasets[0].data = dataSet2[parseInt('0')];
			// 	this.revenueChart.datasets[1].data = dataSet2[parseInt('1')];
			// 	this.revenueChart.datasets[2].data = dataSet2[parseInt('2')];
			// 	this.revenueChart.datasets[3].data = dataSet2[parseInt('3')];
			// } else {
				// this.revenueChart.datasets[0].data = dataSet1[parseInt('0')];
				// this.revenueChart.datasets[1].data = dataSet1[parseInt('1')];
				// this.revenueChart.datasets[2].data = dataSet1[parseInt('2')];
				// this.revenueChart.datasets[3].data = dataSet1[parseInt('3')];
			// }

			this.$refs.revenue.refresh();
		},
		async changeVisitorChart() {
			let vm = this
			const res = await vm.$axios.post('pendapatan/sum_pendapatan_bulanan')
			console.log( res.data.data[0]);
			

			let dataSet1 = [
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			];
			for (let i = 0; i < res.data.data[0].length; i++) {
					dataSet1[0][res.data.data[0][i].bulan-1]=res.data.data[0][i].total_harga_paket
					dataSet1[1][res.data.data[0][i].bulan-1]=res.data.data[0][i].total_harga_paket

			}

			// if (event.value.code === '1') {
			// 	this.growth = '$581,259';
			// 	this.avgCustomer = '$973';
			// 	this.visitorChart.datasets[0].data = dataSet2[parseInt('0')];
			// 	this.visitorChart.datasets[1].data = dataSet2[parseInt('1')];
			// } else {
			// 	this.growth = '$620,076';
			// 	this.avgCustomer = '$1,120';
				// this.visitorChart.datasets[0].data = dataSet1[parseInt('0')];
				this.visitorChart.datasets[1].data = dataSet1[parseInt('1')];
			// }
			this.$refs.visitor.refresh();
		},
		formatDate(value) {
            return value.toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        },
		formatCurrency(value) {
            return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        }
	}
}
</script>

<style lang="scss" scoped>
::v-deep(.p-progressbar) {
	height: .5rem;
	background-color: #D8DADC;

	.p-progressbar-value {
		background-color: #607D8B;
	}
}
</style>