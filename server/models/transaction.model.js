const { getUnixTime, formatISO } = require ('date-fns');
module.exports = (sequelize,DataTypes)=>{

const Transaction = sequelize.define('Transaction',{

    id:{
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    fk_customer_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    cashIn:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue : 0,
    },
    cashOut:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue : 0,
    },
    createdAt: {
      type: DataTypes.DATE, 
    },
    updatedAt: {
      type: DataTypes.DATE,
    }

},
{
    tableName : 'transactions',
}
);

Transaction.beforeCreate(function(transaction){
    const now = formatISO(new Date());
    transaction.createdAt = now;
    transaction.updatedAt = now;
})

Transaction.beforeUpdate(function(transaction){
    transaction.updatedAt = formatISO(new Date());
});

Transaction.associate = (models)=>{ 
    Transaction.belongsTo (models.Customer,{
        foreignKey:'fk_customer_id',
        as:"Customer" 
    });
}

return Transaction;

}

