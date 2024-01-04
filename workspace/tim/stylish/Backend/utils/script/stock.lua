local seckillKey = KEYS[1]
local purchaseQuantity = tonumber(ARGV[1])

local jsonData = redis.call('GET', seckillKey)

local seckillData = cjson.decode(jsonData)

if seckillData and seckillData.amount then
    local stock = tonumber(seckillData.amount)

    if stock >= purchaseQuantity and purchaseQuantity > 0 then
        seckillData.amount = stock - purchaseQuantity

        redis.call('SET', seckillKey, cjson.encode(seckillData))

        return seckillData.amount
    end
end

return 0
