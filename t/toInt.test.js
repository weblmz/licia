it('convert value to an integer', function ()
{
    expect(toInt(1.2)).to.equal(1);
    expect(toInt(0)).to.equal(0);
});