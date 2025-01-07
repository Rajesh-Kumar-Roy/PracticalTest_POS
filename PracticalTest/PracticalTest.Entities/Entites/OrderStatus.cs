using System.Runtime.Serialization;

namespace PracticalTest.Entities.Entites
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,
        [EnumMember(Value = "Payment Recevied")]
        PaymentRecevied,
        [EnumMember(Value = "Payment Failed")]
        PaymentFailed,
        [EnumMember(Value = "Draft")]
        Draft
    }
}
