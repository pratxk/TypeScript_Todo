import { Box, Button, Checkbox,  FormControl, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

export interface Todo {
    title: string;
    completed: boolean;
}
const TodoForm:React.FC = () => {
    const [newTask, setNewTask] = useState('');
    const [todoArray, setTodoArray] = useState<Todo[]>(() => {
        const storedTasks = localStorage.getItem('Todo-List');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
    const [editingTaskValue, setEditingTaskValue] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('Todo-List', JSON.stringify(todoArray));
    }, [todoArray]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewTask(e.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (newTask.trim()) {
            setTodoArray([...todoArray, { title: newTask, completed: false }]);
            setNewTask('');
        }
    }

    function handleRemoveTask(index: number) {
        const newTasks = todoArray.filter((_task: Todo, i: number) => i !== index);
        setTodoArray(newTasks);
    }

    function handleToggleChange(index: number) {
        const newTasks = [...todoArray];
        newTasks[index].completed = !newTasks[index].completed;
        setTodoArray(newTasks);
    }

    function handleEditTask(index: number) {
        setEditingTaskIndex(index);
        setEditingTaskValue(todoArray[index].title); // Set the current task value to state
    }

    function handleSaveTask(index: number) {
        const newTasks = [...todoArray];
        newTasks[index] = { ...newTasks[index], title: editingTaskValue }; // Update the title with the state value
        setTodoArray(newTasks);
        setEditingTaskIndex(null); // Clear editing state
        setEditingTaskValue(''); // Clear the input value
    }

    const handleClear = () => {
        setTodoArray([]);
        localStorage.removeItem('Todo-List');
    };

    return (
        <>
            <Box h='100vh' display={'flex'} mt={5} flexDirection={'column'} alignItems={'center'} gap={'10px'}>
                <Box mt='5px'>
                    <form onSubmit={handleSubmit}>
                        <FormControl display='flex' gap={'2px'}>
                            <Box>
                                <Input type="text" placeholder="Title of task" onChange={handleChange} value={newTask} name='title' />
                            </Box>
                            <Box>
                                <Button type='submit' colorScheme='teal'>Submit</Button>
                            </Box>
                        </FormControl>
                    </form>
                </Box>
                <Box>
                    <Button onClick={handleClear}>Clear</Button>
                </Box>
                <Box mt={5}>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Sr.no</Th>
                                <Th>Completed</Th>
                                <Th>Task</Th>
                                <Th>Remove Task</Th>
                                <Th>Edit Task</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {todoArray.map((task: Todo, index: number) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td style={{ textAlign: "center" }}>
                                        <Checkbox isChecked={task.completed} onChange={() => handleToggleChange(index)} />
                                    </Td>
                                    <Td textDecoration={task.completed ? 'line-through' : 'none'}>
                                        {editingTaskIndex === index ? (
                                            <Input
                                                type="text"
                                                value={editingTaskValue}
                                                onChange={(e) => setEditingTaskValue(e.target.value)} // Update the value in state
                                            />
                                        ) : (
                                            task.title
                                        )}
                                    </Td>
                                    <Td>
                                        <Button colorScheme="red" onClick={() => handleRemoveTask(index)}>Delete</Button>
                                    </Td>
                                    <Td>
                                        {editingTaskIndex === index ? (
                                            <Button onClick={() => handleSaveTask(index)}>Save</Button>
                                        ) : (
                                            <Button onClick={() => handleEditTask(index)} isDisabled={task.completed}>Edit</Button>
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </>
    );
};

export default TodoForm;
