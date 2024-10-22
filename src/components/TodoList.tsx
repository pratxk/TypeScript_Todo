import { Box, Button, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { Todo } from './Todoform';

interface  Props {
    data: Todo[]
}

const Todolist = ({data}: Props) => {

    function handleRemoveTask(index:number) {
        const newTasks = data.filter((_task: Todo, i: number) => i !== index);
        setTasks(newTasks);
    }

    function handleToggleChange(index: number) {
        const newTasks = [...data];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    }
    return (
        <>
            <Box >
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Sr.no</Th>
                            <Th>Completed</Th>
                            <Th>Task</Th>
                            <Th>Remove Task</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((task:Todo, index:number) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td style={{ textAlign: "center" }}>
                                    <Input type="checkbox" checked={task.completed} onChange={() => handleToggleChange(index)} />
                                </Td>
                                <Td className={task.completed ? 'completed' : ''}>
                                    {task.title}
                                </Td>
                                <Td>
                                    <Button className="delete-button" onClick={() => handleRemoveTask(index)}>Delete</Button>
                                </Td>
                            </Tr>
                        ))}

                    </Tbody>
                </Table>
            </Box>
        </>
    )
}

export default Todolist
function setTasks(_newTasks: Todo[]) {
    throw new Error('Function not implemented.');
}

