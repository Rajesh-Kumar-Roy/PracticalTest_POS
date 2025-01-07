using System.Runtime.Serialization;

namespace PracticalTest.Entities.Entites
{
  
    public enum PaymentStatus
    {
        [EnumMember(Value = "Paid")]
        Paid,
        [EnumMember(Value = "Due")]
        Due

    }
    public enum PaymentMethodStatus
    {
        [EnumMember(Value = "Cash")]
        Cash,
        [EnumMember(Value = "BankOrCard")]
        BankOrCard,
        [EnumMember(Value = "MFS")]
        MFS,

    }
}
