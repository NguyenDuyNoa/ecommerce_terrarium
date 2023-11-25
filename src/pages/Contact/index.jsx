import PageLayout from "../../components/PageLayout";

let Contact = () => {
    return (
        <PageLayout>
            <div className=" mx-32 grid grid-cols-3 text-justify leading-loose">
                <section className=" mr-2">
                    <h2 className=" text-5xl mb-20">2020 - NAY</h2>
                    <h2 className=" mb-4">Cùng sống, tìm hiểu và làm việc với cây xanh mỗi ngày, tình yêu với màu xanh ấy ngày càng lớn dần và trỗi dậy.</h2>
                    <h2 className=" mb-10">Không đơn giản chỉ là bán hàng như ban đầu, <b>Terrarium</b> muốn có một không gian đầy sáng tạo, là nơi mọi người có thể đến cùng thưởng thức sự tươi xanh và có những trải nghiệm cho riêng mình. Và…. cửa hàng đầu tiên ra đời.</h2>
                    <img src="https://9xgarden.com/wp-content/uploads/2020/04/9x-garden-story-11.jpg" alt="" />
                </section>

                <section className=" m-2">
                    <img className="mb-4" src="https://9xgarden.com/wp-content/uploads/2020/04/9x-garden-story-9.jpg" alt="" />
                    <h2 className=" mb-4">Đồng thời, lúc này sản phẩm sen đá cũng như phương pháp trồng cây truyền thống lộ ra những nhược điểm: khó sống nếu thiếu sáng, dễ làm bẩn không gian, và mọi người, hầu hết không có kiến thức chăm cây,… Hơn nữa, các phương pháp hiện tại thực hiện cũng phức tạp, mất thời gian, không phù hợp với những người bận rộn hay thường xuyên có những chuyến công tác, du lịch dài ngày.</h2>
                    <h2 className=" mb-4">Thông qua nghiên cứu và tìm kiếm, Terrarium đã tìm được phương pháp trồng mới khi kết hợp với một kỹ sư cây xanh người từng công tác tại vườn ươm Nhật Bản. Phương pháp này có tên: TRỒNG CÂY KHÔNG CẦN ĐẤT (dùng toàn bộ bằng sỏi hydro).</h2>
                </section>

                <section className=" ml-2">
                    <h2 className=" mb-4">Hạn chế lớn nhất chính là nguồn nguyên vật liệu tại Việt Nam chưa phổ biến, sự hiểu biết về phương pháp trồng cây mới này của mọi người hầu như bằng không. Bằng kinh nghiệm, kiến thức và đặc biệt là sự kiên trì bền bỉ, những chậu cây không cần đất với giống cây và nguyên vật liệu đầu vào 100% Made in Vietnam chính thức được ra đời. Sản phẩm khắc phục hầu hết những vấn đề của những phương pháp truyền thống, đơn giản cho người mới chăm sóc cây.</h2>
                    <h2 className=" mb-4">Cùng với đó là những giá thể hoàn hảo nhất cho sản phẩm terrarium và các loại cây thích hợp sống trong lọ thủy tinh cũng chính thức được đến gần hơn với tay khách hàng.</h2>
                    <h2 className=" mb-4">Với phương châm tạo ra những món quà xanh chất lượng và gần gũi với thiên nhiên mà bất cứ ai cũng xứng đáng được nhận, do đó Terrarium tự thiết kế bao bì riêng cho mỗi dòng sản phẩm, thân thiện và an toàn với sức khỏe cũng như môi trường.</h2>
                    <img src="https://9xgarden.com/wp-content/uploads/2020/04/9x-garden-story-13.jpg" alt="" />
                </section>

            </div>
            <div className=" mx-32 mt-20 mb-10">
                <div className="text-center uppercase text-3xl mb-5">
                    <h3>Bản đồ cửa hàng</h3>
                </div>
                <div className=" border-8">
                    <iframe className="w-full h-80" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0446159956105!2d106.69660051458935!3d10.807894892300208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529bbead232ad%3A0x340ddd64705a77c0!2zVEnhu4JVIEPhuqJOSCBMRSBKQVJESU4!5e0!3m2!1svi!2s!4v1669015909321!5m2!1svi!2s"></iframe>
                </div>
            </div>
        </PageLayout>
    )
}
export default Contact;
