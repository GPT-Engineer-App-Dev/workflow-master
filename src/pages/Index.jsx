import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { title: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(index)}
                />
                <span
                  className={`flex-1 ${task.completed ? "line-through text-muted" : ""}`}
                  onClick={() => openTaskModal(task)}
                >
                  {task.title}
                </span>
                <Button variant="outline" size="sm" onClick={() => openTaskModal(task)}>
                  Edit
                </Button>
              </div>
            ))}
            <div className="flex items-center space-x-4">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
              />
              <Button onClick={addTask}>Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={selectedTask.title} readOnly />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Add a description" />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Project</Label>
                <Input placeholder="Project name" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={closeTaskModal}>
                  Cancel
                </Button>
                <Button>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;