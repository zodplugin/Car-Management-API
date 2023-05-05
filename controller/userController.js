const { users, shops } = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


async function getUsers(req, res) {
    try {
        const data = await users.findAll();

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function getUserById(req, res) {
    try {
        // Primary Key = PK
        const id = req.params.id;
        const data = await users.findByPk(id, {
            include: {
                model: shops,
                attributes: ['name']
            }
        });

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function editUser(req, res) {
    try {
        const { username } = req.body;
        const id = req.params.id;

        await users.update({
            username
        }, {
            where: { id }
        })

        res.status(200).json({
            status: 'success',
            message: `data dari id ${id} nya berhasil berubah`
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id
        await users.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            'status': 'success',
            'message': `data ${id} ini berhasil di hapus`
        })
    } catch (err) {
        res.status(400).message(err.message)
    }
}

async function createUser(req, res) {
    try {
        const { username, password } = req.body

        const hashPassword = bcrypt.hashSync(password, 10)
        const newUser = await users.create({
            username,
            password : hashPassword,
        })
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}


async function login (req, res) {
    try {
        const { username, password } = req.body

        const user = await users.findOne({
            where: {
                username
            }
        })

        console.log(user)

        if (!user){
            res.status(404).json({
                status : 'failed',
                message : `user ${username} gak ketemu`
            })
        }

        if(user && bcrypt.compareSync(password, user.password)){

            const token = jwt.sign({
                id: user.id,
                username:user.username,
                role: user.role
            }, 'rahasia')
            res.status(201).json({
                status: 'success',
                data: {
                    user,
                    token
                }
            })
        }
        
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    editUser,
    createUser,
    login
}