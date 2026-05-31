import React, { useMemo, useState } from 'react'
import StatCard from './StatCard'
import Badge from './Badge'
import { initialMembers, initialTasks } from '../data/mockData'
import { isValidEmail } from '../utils/validation'

const statusOptions = ['Pending', 'In Progress', 'Completed']
const priorityOptions = ['Low', 'Medium', 'High']

const emptyTask = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Pending',
  assignedUser: '',
  dueDate: '',
}

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks)
  const [members, setMembers] = useState(initialMembers)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [editingId, setEditingId] = useState(null)
  const [taskForm, setTaskForm] = useState(emptyTask)
  const [memberForm, setMemberForm] = useState({ name: '', role: '', email: '' })
  const [taskError, setTaskError] = useState('')
  const [memberError, setMemberError] = useState('')

  const stats = useMemo(() => ({
    totalTasks: tasks.length,
    completedTasks: tasks.filter((t) => t.status === 'Completed').length,
    pendingTasks: tasks.filter((t) => t.status !== 'Completed').length,
    totalMembers: members.length,
  }), [tasks, members])

  const filteredTasks = tasks.filter((task) => {
    const query = `${task.title} ${task.description} ${task.assignedUser}`.toLowerCase()
    return (
      query.includes(search.toLowerCase()) &&
      (statusFilter === 'All' || task.status === statusFilter) &&
      (priorityFilter === 'All' || task.priority === priorityFilter)
    )
  })

  const resetTaskForm = () => {
    setTaskForm(emptyTask)
    setEditingId(null)
  }

  const saveTask = (e) => {
    e.preventDefault()
    if (!taskForm.title.trim()) return setTaskError('Task title is required.')
    if (!taskForm.assignedUser.trim()) return setTaskError('Assigned user is required.')
    if (!taskForm.dueDate) return setTaskError('Due date is required.')

    setTaskError('')
    if (editingId !== null) {
      setTasks((prev) => prev.map((task) => task.id === editingId ? { ...task, ...taskForm } : task))
    } else {
      setTasks((prev) => [...prev, { id: Date.now(), ...taskForm }])
    }
    resetTaskForm()
  }

  const editTask = (task) => {
    setEditingId(task.id)
    setTaskForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      assignedUser: task.assignedUser,
      dueDate: task.dueDate,
    })
  }

  const deleteTask = (id) => setTasks((prev) => prev.filter((task) => task.id !== id))

  const addMember = (e) => {
    e.preventDefault()
    if (!memberForm.name.trim()) return setMemberError('Member name is required.')
    if (!memberForm.role.trim()) return setMemberError('Role is required.')
    if (!isValidEmail(memberForm.email)) return setMemberError('Enter a valid email.')

    setMemberError('')
    setMembers((prev) => [...prev, { id: Date.now(), ...memberForm }])
    setMemberForm({ name: '', role: '', email: '' })
  }

  return (
    <div className="dashboard-stack">
      <section className="hero panel">
        <div>
          <h1>Project Progress Overview</h1>
          <p className="subtitle">
            Manage tasks, team members, and progress with reusable components and clean responsive UI.
          </p>
        </div>
        <div className="pill">Responsive React UI</div>
      </section>

      <section className="stats-grid">
        <StatCard label="Total Tasks" value={stats.totalTasks} />
        <StatCard label="Completed Tasks" value={stats.completedTasks} />
        <StatCard label="Pending Tasks" value={stats.pendingTasks} />
        <StatCard label="Total Team Members" value={stats.totalMembers} />
      </section>

      <section className="grid-2">
        <div className="panel section">
          <div className="section-head">
            <h2>Task Management</h2>
            <p className="muted">Create, edit, delete, search, and filter tasks.</p>
          </div>

          <div className="toolbar">
            <input
              className="field"
              style={{ maxWidth: 260 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
            />
            <select className="field" style={{ maxWidth: 180 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All</option>
              {statusOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
            <select className="field" style={{ maxWidth: 180 }} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option>All</option>
              {priorityOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned User</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td><strong>{task.title}</strong></td>
                    <td className="muted">{task.description}</td>
                    <td><Badge label={task.priority} type="priority" /></td>
                    <td><Badge label={task.status} type="status" /></td>
                    <td>{task.assignedUser}</td>
                    <td>{task.dueDate}</td>
                    <td>
                      <div className="actions">
                        <button className="btn sm ghost" onClick={() => editTask(task)}>Edit</button>
                        <button className="btn sm danger" onClick={() => deleteTask(task.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="muted">No tasks found.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="sub-panel">
            <h3>{editingId !== null ? 'Edit Existing Task' : 'Create New Task'}</h3>
            <form className="stack" onSubmit={saveTask}>
              <div className="form-grid">
                <div>
                  <label>Task Title</label>
                  <input className="field" value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} />
                </div>
                <div>
                  <label>Assigned User</label>
                  <input className="field" value={taskForm.assignedUser} onChange={(e) => setTaskForm({ ...taskForm, assignedUser: e.target.value })} />
                </div>
                <div>
                  <label>Priority</label>
                  <select className="field" value={taskForm.priority} onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}>
                    {priorityOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div>
                  <label>Status</label>
                  <select className="field" value={taskForm.status} onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}>
                    {statusOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div>
                  <label>Due Date</label>
                  <input className="field" type="date" value={taskForm.dueDate} onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })} />
                </div>
                <div>
                  <label>Description</label>
                  <input className="field" value={taskForm.description} onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })} />
                </div>
              </div>

              {taskError ? <div className="error">{taskError}</div> : null}

              <div className="actions">
                <button className="btn primary" type="submit">{editingId !== null ? 'Update Task' : 'Save Task'}</button>
                <button className="btn ghost" type="button" onClick={resetTaskForm}>Clear</button>
              </div>
            </form>
          </div>
        </div>

        <div className="panel section">
          <div className="section-head">
            <h2>Team Members</h2>
            <p className="muted">View members and add new ones with validation.</p>
          </div>

          <div className="members-list">
            {members.map((member) => (
              <article className="member-card" key={member.id}>
                <div>
                  <strong>{member.name}</strong>
                  <div className="muted">{member.role}</div>
                </div>
                <div className="muted">{member.email}</div>
              </article>
            ))}
          </div>

          <div className="sub-panel">
            <h3>Add New Member</h3>
            <form className="stack" onSubmit={addMember}>
              <input className="field" placeholder="Full name" value={memberForm.name} onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} />
              <input className="field" placeholder="Role" value={memberForm.role} onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })} />
              <input className="field" placeholder="Email" value={memberForm.email} onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })} />
              {memberError ? <div className="error">{memberError}</div> : null}
              <button className="btn primary" type="submit">Add Member</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
