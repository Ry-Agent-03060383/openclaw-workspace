package com.wisdom.finance.thirdparty.service;

import com.wisdom.finance.thirdparty.entity.ServiceOrder;
import com.wisdom.finance.thirdparty.entity.ThirdPartyService;
import com.wisdom.finance.thirdparty.mapper.ServiceOrderRepository;
import com.wisdom.finance.thirdparty.mapper.ThirdPartyServiceRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ThirdPartyServiceServiceTest {

    @Mock private ThirdPartyServiceRepository tpsRepo;
    @Mock private ServiceOrderRepository orderRepo;
    @InjectMocks private ThirdPartyServiceService service;

    private ThirdPartyService makeService(Long id) {
        ThirdPartyService s = new ThirdPartyService();
        s.setId(id);
        s.setServiceName("财税代理记账");
        s.setServiceType("FINANCE");
        s.setServiceProvider("至诚财税");
        s.setPrice(BigDecimal.valueOf(500));
        s.setDuration(30);
        s.setStatus("ACTIVE");
        s.setRating(5);
        s.setReviewCount(0);
        return s;
    }

    private ServiceOrder makeOrder(Long id) {
        ServiceOrder o = new ServiceOrder();
        o.setId(id);
        o.setServiceId(1L);
        o.setUserId(10L);
        o.setOrderAmount(BigDecimal.valueOf(500));
        o.setOrderStatus("PENDING");
        o.setPaymentStatus("PENDING");
        return o;
    }

    @Test
    void createService_shouldSaveWithDefaults() {
        ThirdPartyService s = makeService(null);
        when(tpsRepo.save(any())).thenAnswer(i -> i.getArgument(0));
        ThirdPartyService result = service.createService(s);
        assertEquals("ACTIVE", result.getStatus());
        assertEquals(5, result.getRating());
        assertEquals(0, result.getReviewCount());
        assertFalse(result.getIsRecommended());
        assertNotNull(result.getServiceCode());
        verify(tpsRepo).save(any());
    }

    @Test
    void updateService_shouldUpdateFields() {
        ThirdPartyService existing = makeService(1L);
        existing.setTags("代理记账,报税");

        ThirdPartyService updates = new ThirdPartyService();
        updates.setServiceName("高级财税服务");
        updates.setPrice(BigDecimal.valueOf(999));

        when(tpsRepo.findById(1L)).thenReturn(Optional.of(existing));
        when(tpsRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        ThirdPartyService result = service.updateService(1L, updates);
        assertEquals("高级财税服务", result.getServiceName());
        assertEquals(BigDecimal.valueOf(999), result.getPrice());
        assertEquals("FINANCE", result.getServiceType()); // unchanged
        verify(tpsRepo).save(any());
    }

    @Test
    void updateService_notFound_shouldThrow() {
        when(tpsRepo.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> service.updateService(99L, new ThirdPartyService()));
    }

    @Test
    void getService_shouldReturn() {
        when(tpsRepo.findById(1L)).thenReturn(Optional.of(makeService(1L)));
        assertNotNull(service.getService(1L));
        assertNull(service.getService(99L));
    }

    @Test
    void getServices_shouldFilterByType() {
        when(tpsRepo.findByServiceType("FINANCE")).thenReturn(List.of(makeService(1L)));
        assertEquals(1, service.getServices("FINANCE", null).size());
    }

    @Test
    void getServices_shouldFilterByStatus() {
        when(tpsRepo.findByStatus("ACTIVE")).thenReturn(List.of(makeService(1L)));
        assertEquals(1, service.getServices(null, "ACTIVE").size());
    }

    @Test
    void getServices_shouldReturnAll() {
        when(tpsRepo.findAll()).thenReturn(List.of(makeService(1L), makeService(2L)));
        assertEquals(2, service.getServices(null, null).size());
    }

    @Test
    void createServiceOrder_shouldCreateSuccessfully() {
        when(tpsRepo.findById(1L)).thenReturn(Optional.of(makeService(1L)));
        ServiceOrder order = makeOrder(null);
        when(orderRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        ServiceOrder result = service.createServiceOrder(order);
        assertEquals("PENDING", result.getOrderStatus());
        assertEquals("PENDING", result.getPaymentStatus());
        assertNotNull(result.getOrderNo());
        verify(orderRepo).save(any());
    }

    @Test
    void createServiceOrder_serviceNotFound_shouldThrow() {
        when(tpsRepo.findById(99L)).thenReturn(Optional.empty());
        ServiceOrder order = new ServiceOrder();
        order.setServiceId(99L);
        assertThrows(RuntimeException.class, () -> service.createServiceOrder(order));
    }

    @Test
    void payServiceOrder_shouldUpdateStatus() {
        ServiceOrder order = makeOrder(1L);
        when(orderRepo.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        ServiceOrder result = service.payServiceOrder(1L, "ALIPAY", "alipay_tx_001");
        assertEquals("PAID", result.getPaymentStatus());
        assertEquals("IN_PROGRESS", result.getOrderStatus());
        assertEquals("ALIPAY", result.getPaymentMethod());
        assertEquals("alipay_tx_001", result.getTransactionId());
        assertNotNull(result.getPaymentTime());
        assertNotNull(result.getServiceStartTime());
    }

    @Test
    void completeServiceOrder_shouldSetCompleted() {
        ServiceOrder order = makeOrder(1L);
        when(orderRepo.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        ServiceOrder result = service.completeServiceOrder(1L, "月度财务报表.pdf");
        assertEquals("COMPLETED", result.getOrderStatus());
        assertEquals("月度财务报表.pdf", result.getDeliverables());
        assertNotNull(result.getServiceEndTime());
    }

    @Test
    void rateServiceOrder_shouldUpdateRating() {
        ThirdPartyService tps = makeService(1L);
        tps.setRating(4);
        tps.setReviewCount(5);

        ServiceOrder order = makeOrder(1L);
        order.setServiceId(1L);

        when(orderRepo.findById(1L)).thenReturn(Optional.of(order));
        when(tpsRepo.findById(1L)).thenReturn(Optional.of(tps));
        when(orderRepo.save(any())).thenAnswer(i -> i.getArgument(0));
        when(tpsRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        ServiceOrder result = service.rateServiceOrder(1L, 5, "服务很好");
        assertEquals(5, result.getRating());
        assertEquals("服务很好", result.getReview());
        assertEquals(6, tps.getReviewCount());
        verify(tpsRepo).save(any());
    }

    @Test
    void getServiceOrder_shouldReturn() {
        when(orderRepo.findById(1L)).thenReturn(Optional.of(makeOrder(1L)));
        assertNotNull(service.getServiceOrder(1L));
        assertNull(service.getServiceOrder(99L));
    }

    @Test
    void getServiceOrders_shouldFilterByUser() {
        when(orderRepo.findByUserId(10L)).thenReturn(List.of(makeOrder(1L)));
        assertEquals(1, service.getServiceOrders(10L, null, null).size());
    }

    @Test
    void getServiceOrders_shouldFilterByProvider() {
        when(orderRepo.findByProviderId(5L)).thenReturn(List.of(makeOrder(1L)));
        assertEquals(1, service.getServiceOrders(null, 5L, null).size());
    }

    @Test
    void getServiceOrders_shouldFilterByStatus() {
        when(orderRepo.findByOrderStatus("PENDING")).thenReturn(List.of(makeOrder(1L)));
        assertEquals(1, service.getServiceOrders(null, null, "PENDING").size());
    }

    @Test
    void getServiceOrders_shouldReturnAll() {
        when(orderRepo.findAll()).thenReturn(List.of(makeOrder(1L), makeOrder(2L)));
        assertEquals(2, service.getServiceOrders(null, null, null).size());
    }

    @Test
    void payServiceOrder_notFound_shouldThrow() {
        when(orderRepo.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> service.payServiceOrder(99L, "CASH", "tx999"));
    }

    @Test
    void completeServiceOrder_notFound_shouldThrow() {
        when(orderRepo.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> service.completeServiceOrder(99L, "deliverables"));
    }
}
