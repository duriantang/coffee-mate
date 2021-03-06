require './global'

console.log '\n###################### reinforce syntax ##########################\n'

# the log macro
a = 1
b = 2
log -> a
log.info -> a + b
log.warn -> a - b
log.error -> sum(a, b, 1)
log -> log.histories

# dict comprehension
d = dict([i, i*i] for i in [1..3])
log "dict([i, i*i] for i in [1..3]) ==> #{json d}"

# sleep syntactic sugar
sleep 2, ->
	log 'THE END'

console.log '\n######################## copy & deepcopy #########################\n'

a = {x:1, y:2, z:[1, 2]}
log -> a
log -> return (b = copy(a); b.x = 2; b.z[0] = 2; [a, b])

a = {x:1, y:2, z:[1, 2]}
log -> return (b = deepcopy(a); b.x = 2; b.z[0] = 2; [a, b])

console.log '\n######################### type trans #############################\n'

log -> int('2') #==> 2
log -> int('2.34') #==> null
log -> int('2.34.56') #==> null
log -> int(2) #==> 2
log -> int(2.34) #==> 2
log -> int(true) #==> 1
log -> int(false) #==> 0
log (-> int(a)), (-> int('12a')), (-> int('12a', 16))
log (-> float(a)), (-> float('1.2e-3')), (-> float('1.2x-3'))
log -> json(d)
log (-> hex(15)), (-> hex(16)), (-> hex(1234))

console.log '\n####################### reinforce String #########################\n'

log -> 'hello, {name}!'.format(name: 'beauty')
log -> 'hello, beauty! '.repeat(3)

console.log '\n######################## reinforce Array #########################\n'

log -> [1, 2, 3].first
log -> [1, 2, 3].second
log -> [1, 2, 3].third
log -> [1, 2, 3].last
log -> [1, 2, 3].repeat(3)
log -> [1, 2, 3].repeat(3).sort().unique()

console.log '\n####################### reinforce Object #########################\n'

log -> d
log -> d.size
log -> {}.extend(d, 0: 0, 1: 'known')
log -> {}.update(d, 0: 0, 1: 'known')

console.log '\n####################### lazy evaluation ##########################\n'

ls = (chr(ord('a')+i) for i in [0...3])
log -> ls
log -> list enumerate ls
log -> list head(3) nature_number()
log -> list head(3) tail(3) nature_number()
log -> list(zip(nature_number(), ls))
log -> list head(4)(cart(list(range(0, 10)), ls))
log -> all((n) -> 'a'.repeat(n).length == n)(range(0, 100))
log -> list filter((x) -> x % 3 == 1) range(10)
log -> foreach range(10), ((x, r) -> return (r.push x if x % 3 == 1)), []

console.log '\n######################### url helpers ############################\n'

log -> d.uri_encode()
log -> d.uri_encode().uri_decode()

console.log '\n###################### simple pseudo-random ######################\n'

random = random_gen(0)
(log -> random()) for i in [0...3]
log -> list head(3) random_gen(0)

console.log '\n#################### mathematical functions ######################\n'

log -> square(2)
log -> cube(2)
log -> abs(-2)
log -> floor(2.1)
log -> ceil(2.1)
log -> sum(list range(0, 100))

