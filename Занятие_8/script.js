Vue.component('task',{
	props: ['data'],
	data() {
		return {
		}
	},
	methods: {



		task_done(){

						this.$emit('task_done');

		}
	},
	template: `
  <div class="task">
    <div>
      <h3 class="task__title">{{data.title}}</h3>
      <p v-if="data.desc!=''" class="task__desc">{{data.desc}}</p>
    </div>
    
    
   	 <button class="task__done" @click="task_done()">✔️</button>
	
    
  </div>`
});


var vue = new Vue({
	el: '#app',
	data: {
		string: 'asdasda',
		new_task: {
			title: '',
			desc: ''
		},
		tasks : [
			{
				title: 'Изучить основы vue.js',
				desc: 'Попробовать написать калькулятор',
			},
			{
				title: 'Прочитать книгу "Vue.js в действии"',
				desc: '',
			}
		],

		end_tasks: [
			{title:'',
			descr:''}
		]
	},
	methods: {
		add_task(){
			if(this.new_task.title != ''){
				this.tasks.push({
					title: this.new_task.title,
					desc: this.new_task.desc
				});
				this.new_task.title='';
				this.new_task.desc='';

				localStorage.setItem('added_tasks', JSON.stringify(this.tasks));

			}
		},
		delete_task(id){
			obj = this.tasks.splice(id,1);
			this.end_tasks.push(obj);
			console.log(this.end_tasks);
			localStorage.setItem('ended_tasks', JSON.stringify(this.end_tasks));
		}
	}
});
