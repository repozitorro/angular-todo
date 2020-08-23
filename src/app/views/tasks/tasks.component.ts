import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from 'src/app/model/Task';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

    private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
    private dataSource: MatTableDataSource<Task>;

    @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator
    @ViewChild(MatSort, {static: false}) private sort: MatSort

    tasks: Task[];

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit() {
        this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

        this.dataSource = new MatTableDataSource();

        this.refreshTable();
    }

    ngAfterViewInit(): void {
        this.addTableObject()
    }

    // toggleTaskCompleted(task: Task) {
    //     task.completed = !task.completed
    // }

    private getPriorityColor(task: Task) {

        if (task.completed) {
            return '#F8F9FA';
        }

        if (task.priority && task.priority.color) {
            return task.priority.color;
        }

        return '#fff';

    }

    private refreshTable() {
        this.dataSource.data = this.tasks;
        this.addTableObject()

        this.dataSource.sortingDataAccessor = (task, colName) => {
            switch (colName) {
                case 'priority': {
                    return task.priority ? task.priority.id : null
                }
                case 'category': {
                    return task.category ? task.category.title : null
                }
                case 'date': {
                    return task.date ? task.date : null
                }
                case 'title': {
                    return task.title
                }
            }
        }

    }

    private addTableObject() {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
    }
}
