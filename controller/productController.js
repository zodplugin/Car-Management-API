// yang bantu upload file
const { imagekit } = require('../lib/imagekit')



const { product } = require('../models');

async function getProducts(req, res) {
    try {
        const products = await product.findAll();

        res.status(200).json({
            status: 'success',
            data: {
                products
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function searchProduct(req, res) {
    try {
        const products = await product.findAll({
            where: {
                name: {
                    [Op.endsWith]: req.query.name
                }
            }
        })

        res.status(200).json({
            status: 'success',
            data: {
                products
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function getProductById(req, res) {
    try {
        // Primary Key = PK
        const id = req.params.id;
        const data = await product.findByPk(id);

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

async function editProduct(req, res) {
    try {
        const { name,price,stock } = req.body;
        const id = req.params.id;

        const checkRequired = req.body.name && req.body.price && req.body.stock ? true : false
        
        if(!checkRequired){
            res.status(401).json({
                status :"failed",
                message: "data tidak lengkap"
            })
        }else if(name.length < 3){
            res.status(401).json({
                status :"failed",
                message: "data nama tidak sesuai pastikan panjangnya lebih dari 10"
        })
        }else{
                const data = await product.update({
                    name,
                    price,
                    stock
                }, {
                    where: { id }
                })

                if (!data){
                    res.status(401).json({
                        status :"failed",
                        message: "data tidak ditemukan"
                    })
                }

                res.status(200).json({
                    status: 'success',
                    message: `data dari id ${id} nya berhasil berubah`,
                })
        }

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function deleteProduct(req, res) {
    try {
        const id = req.params.id
        const data = await product.destroy({
            where: {
                id
            }
        })

        if (!data){
            res.status(401).json({
                status :"failed",
                message: "data tidak ditemukan"
            })
        }else{
            res.status(200).json({
                'status': 'success',
                'message': `data ${id} ini berhasil di hapus`
            })
        }

       
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function createProduct(req, res) {
    try {
        const { name, price, stock } = req.body
        const checkRequired = req.body.name && req.body.price && req.body.stock ? true : false
        
        if(!checkRequired){
            res.status(401).json({
                status :"failed",
                message: "data tidak lengkap"
            })
        }else if(name.length < 3){
            res.status(401).json({
                status :"failed",
                message: "data nama tidak sesuai pastikan panjangnya lebih dari 10"
            })
        }else{
            const newProduct = await product.create({
                name,
                price,
                stock
            })
            res.status(201).json({
                status: 'success',
                data: {
                    product: newProduct
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

const adminProduct =  async (req, res) => {
    try {
        // melakukan check jika ada req.query.stock
        if (req.query.stock) {
            // parse req.query.stock yg awalnya string => number
            const requestStock = Number(req.query.stock)

            // check mau nya query apa, kurang dari atau kurang dari
            if (req.query.filter === 'kurang') {
                // proses ambil data product sesuai request query stock kurang dari
                const products = await product.findAll({
                    order: [['id', 'ASC']],
                    where: {
                        stock: {
                            [Op.lte]: requestStock
                        }
                    }
                });
                res.render("products/index", {
                    products
                })
            } else {
                // proses ambil data product sesuai request query stock dan lebih dari
                const products = await product.findAll({
                    order: [['id', 'ASC']],
                    where: {
                        stock: {
                            [Op.gt]: requestStock
                        }
                    }
                });
                res.render("products/index", {
                    products
                })
            }
        } else if (req.query.search) {
            const products = await product.findAll({
                order: [['id', 'DESC']],
                where: {
                    name: {
                        [Op.substring]: req.query.search
                    }
                }
            });
            res.render("products/index", {
                products
            })
        } else {
            const products = await product.findAll({
                order: [['stock', 'ASC']],
            });
            res.render("products/index", {
                products
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

const adminProductCreate = async (req, res) => {
    res.render("products/create")
}

const productsCreate = async (req, res) => {
    const { name, price, stock } = req.body
    const file = req.file

    if(!name && !price && !stock && !file){
        res.status(401).json({
            status :"failed",
            message: "data tidak lengkap"
        })
    }else if(name.length < 10){
        res.status(401).json({
            status :"failed",
            message: "data nama tidak sesuai pastikan panjangnya lebih dari 10"
        })
    }

    // untuk dapat extension file
    // ImageBitmap.jpg => jpg itu extension nya
    const split = file.originalname.split('.');
    const ext = split[split.length - 1];

    // proses upload file ke imagekit
    const img = await imagekit.upload({
        file: file.buffer, // required
        fileName: `IMG-${Date.now()}.${ext}`,
    })

    const data = await product.create({
        name,
        price,
        stock,
        imageUrl: img.url
    })
    res.redirect(200, "/admin/products")
    // res.status(201).json({
    //     data 
    // })
}

const editProductById = async (req, res) => {
    // const productDetail = await product.findByPk(req.params.id);
    const productDetail = await axios.get(`http://localhost:3000/api/products/${req.params.id}`)
    console.log(productDetail.data)
    res.render("products/edit", {
        title: "Edit",
        productDetail: productDetail.data
    })
}

const updateProductById = async (req, res) => {
    const id = req.params.id
    const { name, price, stock } = req.body
    await product.update({
        name,
        price,
        stock
    }, {
        where: {
            id
        }
    })
    res.redirect(200, "/admin/products")
}


const deleteProductById = async (req, res) => {
    const id = req.params.id
    await product.destroy({
        where: {
            id
        }
    })
    res.redirect(200, "/admin/products")
}



module.exports = {
    adminProduct,
    adminProductCreate,
    productsCreate,
    editProductById,
    updateProductById,
    deleteProductById,
//  API
    getProducts,
    getProductById,
    searchProduct,
    deleteProduct,
    editProduct,
    createProduct,
}