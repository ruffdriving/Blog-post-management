import React from "react";
import Navbar from "../component/Navbar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";


const Analytics = () => {
    const chatData=[
        {name:'Admin',posts:5},
        {name:'User',posts:3},
        {name:'Test',posts:4},
        {name:'Demo',posts:2},
    ];

    const headers =[
        {label: 'ID', key:'id'},
        {label: 'Title', key:'title'},
        {label: 'Author', key:'author'},
        {label: 'Date', key:'date'},
    ];
    const headers2=['ID','Author','Date','Title'];
    const COLORS=['#0088FE','#00C49F','#FFBB28','#FF8042'];

    

  return (
    <>
    <Navbar/>
    <div className="analytics-page">
    <main className="analytics-main">
        <header className="analytics-header">
            <h1>Blog Analytics</h1>
            <p>Insights ito your blog's performance and activity.</p>
        </header>
        <div className="charts-container">
            <div className="chart-card">
                <h3>Posts per Author</h3>
                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharry="3 3 "/>
                            <Xaxis dataKey="name" />
                            <Yaxixs />
                            <Tooltip/>
                            <Legend/>
                            <Bar
                            dataKey="posts"
                            fill="#8884d8"
                            name="Number of posts"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="chart-card">
                <h3>Distribution</h3>
                <div className="charts-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="posts"
                            label
                            >
                            {chartData.map((entry,index)=>(
                                <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                            </Pie>
                            <Tooltip/>
                        </PieChart>

                    </ResponsiveContainer>
                </div>
            </div>
        </div>
        <div className="posts-table-section">
            <h3>All posts </h3>
            <div className="table-wrapper">
                <table className="analytics-table">
                    <thead>
                        <tr>
                           {headers.map((header,index)=>(
                            <th>{headers.label}</th>
                           ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>React Basics</td>
                            <td>Admin</td>
                            <td>16/02/2026</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Understanding hooks</td>
                            <td>User</td>
                            <td>15/02/2026</td>
                        </tr>
                         <tr>
                            <td>3</td>
                            <td>JavaScript ES6</td>
                            <td>Test</td>
                            <td>14/02/2026</td>
                        </tr>
                    </tbody>
                </table>
            </div>

                <div className="pagination">
                    <button className="page-btn">Previous</button>
                     <button className="page-btn active">1</button>
                      <button className="page-btn">2</button>
                       <button className="page-btn">3</button>
                        <button className="page-btn">Next</button>
                </div>
            
        </div>


    </main>
</div>
</>

  )
}

export default Analytics
